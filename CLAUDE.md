# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`fozz` is a personal technical blog built with the Next.js App Router. Posts are MDX documents that double as step-by-step tutorials on deploying apps to Azure with Terraform and GitHub Actions (the same techniques are used to deploy this very site). The site is statically exported.

`README.md` is untouched `create-next-app` boilerplate — it describes nothing about this project; ignore it.

## Commands

This project uses **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`), though scripts work with npm too.

- `pnpm dev` — run the dev server (`next dev --webpack`) at http://localhost:3000
- `pnpm build` — production build + static export (`next build --webpack`); output goes to `out/`
- `pnpm start` — serve a non-exported production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)

There is no test suite configured.

Note: builds use the Webpack bundler explicitly (`--webpack`), not Turbopack. Contentlayer 0.3.4 is unmaintained and its Next integration is a webpack plugin, so this flag is what keeps the (Next 16 / React 19) build working — keep it when editing scripts.

## Architecture

### Content pipeline (the core of the site)

Posts live in `content/<slug>/page.mdx`. The flow is:

1. **Contentlayer** (`contentlayer.config.ts`) scans `content/**/page.mdx`, validates frontmatter, and compiles each into the `Post` type with computed `slug` and `url` (`/blog/<slug>`). Fields: `title`, `date`, `excerpt` (all required) and `isNew` (optional boolean, default `false` — renders a `<NewBadge>` next to the post title). Generated output lands in `.contentlayer/generated/` and is imported as `allPosts`.
2. **next.config.ts** wraps the Next config with `withContentlayer(...)` so generation runs as part of `dev`/`build`. It also sets `output: 'export'` (static HTML) and `images.unoptimized: true` (required for static export).
3. **Routing**: `app/blog/page.tsx` sorts all posts by date and hands them to `components/postList.tsx` (a client component doing "load more" pagination, 5 at a time); `app/blog/[slug]/page.tsx` resolves a post by slug (using `generateStaticParams`) and passes `post.body.code` to the client `MDXContent` component.
4. **Rendering**: `components/MDXContent.tsx` is a `"use client"` component that runs Contentlayer's `useMDXComponent` hook on the compiled code, injecting the custom component map.

Both route files import `allPosts` via a **relative** path (`../../.contentlayer/generated`), not the `@/` alias — match that when adding routes.

**`.contentlayer/` is committed to git** (it is not in `.gitignore`). Any `dev`/`build` run rewrites `.contentlayer/generated/**` and adds a new content-hash-named pair under `.contentlayer/.cache/`, so those show up as diff noise. Expect it; commit the regenerated output along with content changes.

### Custom MDX components

`mdx-components.tsx` is the single registration point — both for HTML element overrides and for components usable by name directly inside `.mdx`:

- Elements: `h1`–`h3`, `p`, `img` (→ `BlogImage`), `a` (→ `mdxLink`), `ul`/`ol`/`li` (→ `List`/`ListItem`), `code` (→ `CodeBlock`).
- Named components for MDX authors: `<BlogImage>` (`size="small|medium|large"` → 400/800/1200px), `<TechStack>` (`components/svg.tsx`), `<Prerequisites>` (`components/prereq.tsx`), `<NewBadge>`.

When adding a component for use in posts, register it here. Styling is Tailwind-class-based and applied in this map, not in the MDX.

`CodeBlock` (`components/CodeBlock.tsx`) uses `react-syntax-highlighter` (Prism, `oneDark`) and parses the fence info string for a filename: ` ```yaml:title=workflow.yml ` renders a titled header bar with the copy button in it. A fence with no language and a single line is treated as inline `<code>`.

To add a post: create `content/<slug>/page.mdx` with the required frontmatter. No code changes needed — Contentlayer and the dynamic route pick it up automatically. Post images referenced from MDX live under `public/` (and `public/docs/`).

### Styling and theming

Tailwind CSS **v3** (`tailwind.config.js`) + PostCSS. Two Google fonts loaded in `app/layout.tsx` via `next/font`: Inter (`--font-sans`) and Lora (`--font-heading`), exposed as the `font-sans` / `font-heading` utilities. Global styles in `app/globals.css`.

Two gotchas here:

- **Tailwind's `content` globs cover only `app/`, `pages/`, `components/` — not `content/`.** Tailwind classes written directly inside an `.mdx` file will not be generated and will silently do nothing. Put the styling in `mdx-components.tsx` (or a registered component) instead.
- **There are two PostCSS configs**: `postcss.config.js` (CJS, `tailwindcss` + `autoprefixer` — the Tailwind v3 setup that matches the installed `tailwindcss@3` and `tailwind.config.js`) and `postcss.config.mjs` (referencing `@tailwindcss/postcss`, the v4 plugin). The `.mjs` is a leftover from a half-done v4 migration; editing it has no effect on the build. Fix the `.js` one, or finish/remove the v4 leftovers deliberately.

Dark mode is `darkMode: 'class'`. `lib/theme.tsx` toggles the `dark` class on `<html>`, persists the choice to `localStorage` (`'light' | 'dark' | 'system'`; `system` clears the key and follows `prefers-color-scheme`), and broadcasts changes over a `mitt` emitter so `components/Navbar.tsx` can keep its toggle in sync. `initTheme()` exists for load-time restoration.

## Infrastructure & deployment (`.github/`)

The Azure infra is itself the subject matter of the blog posts; the live config is under `.github/Terraform/` and `.github/workflows/`.

- **Auth**: all workflows use Azure **OIDC** (federated credentials, `id-token: write`) — no stored secrets beyond `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID`.
- **`backend.yaml`** (manual `workflow_dispatch`): bootstraps the Terraform remote-state backend — creates RG `RG-Fozz-Management-weu`, storage account `safozzmanagementweu`, and `tfstate` container. Run once before Terraform.
- **`terraform.yaml`**: on push to `main` touching `.github/Terraform/**`, runs init/fmt/validate/plan/apply against the remote backend. Backend RG/storage names are hardcoded in the workflow env (they are not Terraform variables — change them in both `terraform.yaml` and `destroy.yaml`).
- **`destroy.yaml`**: manual-dispatch-only teardown, same init/plan flow.
- **Terraform** (`main.tf`, `locals.tf`, `appservice.tf`, `variables.tf`): provisions a Linux App Service plan (B1) and App Service (`fozz-appsvc`, `NODE|20-lts`) with a system-assigned identity. `strg.tf` (static-website storage) and `frontdoor.tf` (Front Door CDN) are fully commented out — earlier/alternative hosting approaches kept for reference, matching the blog tutorials.
- **`deploy.yaml`**: on push to `main`, builds with pnpm and deploys `./out` to the `fozz-appsvc` Web App.

### Deployment note

The site is a **static export** (`output: 'export'` → `out/`) deployed to the Linux **Node** App Service `fozz-appsvc`. Since a static export has no Node server, `appservice.tf` sets `site_config.app_command_line` to `pm2 serve /home/site/wwwroot --no-daemon` (deliberately without `--spa`, since the export emits one HTML file per route). `appservice.tf` also has `lifecycle { ignore_changes = [site_config[0].linux_fx_version] }` so Terraform runs don't clobber what GitHub Actions deployed.
