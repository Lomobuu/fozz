# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`fozz` is a personal technical blog built with the Next.js App Router. Posts are MDX documents that double as step-by-step tutorials on deploying apps to Azure with Terraform and GitHub Actions (the same techniques are used to deploy this very site). The site is statically exported.

## Commands

This project uses **pnpm** (see `pnpm-lock.yaml` / `pnpm-workspace.yaml`), though scripts work with npm too.

- `pnpm dev` — run the dev server (`next dev --webpack`) at http://localhost:3000
- `pnpm build` — production build + static export (`next build --webpack`); output goes to `out/`
- `pnpm start` — serve a non-exported production build
- `pnpm lint` — run ESLint (flat config in `eslint.config.mjs`, extends `next/core-web-vitals` + `next/typescript`)

There is no test suite configured.

Note: builds use the Webpack bundler explicitly (`--webpack`), not Turbopack — keep that flag when editing scripts, since Contentlayer's integration is tied to it.

## Architecture

### Content pipeline (the core of the site)

Posts live in `content/<slug>/page.mdx`. The flow is:

1. **Contentlayer** (`contentlayer.config.ts`) scans `content/**/page.mdx`, validates frontmatter (`title`, `date`, `excerpt` — all required), and compiles each into the `Post` type with computed `slug` and `url` (`/blog/<slug>`). Generated output lands in `.contentlayer/generated/` and is imported as `allPosts`.
2. **next.config.ts** wraps the Next config with `withContentlayer(...)` so generation runs as part of `dev`/`build`. It also sets `output: 'export'` (static HTML) and `images.unoptimized: true` (required for static export).
3. **Routing**: `app/blog/page.tsx` lists all posts sorted by date; `app/blog/[slug]/page.tsx` resolves a post by slug (using `generateStaticParams`) and passes `post.body.code` to the client `MDXContent` component.
4. **Rendering**: `components/MDXContent.tsx` is a `"use client"` component that runs Contentlayer's `useMDXComponent` hook on the compiled code, injecting the custom component map.

### Custom MDX components

`mdx-components.tsx` maps both standard HTML elements (`h1`–`h3`, `p`, `ul`/`ol`/`li`, `a`, `img`, `code`) and custom React components usable directly inside `.mdx` files: `<BlogImage>`, `<TechStack>`, `<Prerequisites>`. When adding a new component for use in posts, register it here. Styling is Tailwind-class-based and applied in this map, not in the MDX.

To add a post: create `content/<slug>/page.mdx` with the three required frontmatter fields. No code changes needed — Contentlayer and the dynamic route pick it up automatically. Post images referenced from MDX live under `public/` (and `public/docs/`).

### Styling

Tailwind CSS v3 + PostCSS. Two Google fonts loaded in `app/layout.tsx` via `next/font`: Inter (`--font-sans`) and Lora (`--font-heading`). Dark mode uses Tailwind's `dark:` variants. Global styles in `app/globals.css`.

## Infrastructure & deployment (`.github/`)

The Azure infra is itself the subject matter of the blog posts; the live config is under `.github/Terraform/` and `.github/workflows/`.

- **Auth**: all workflows use Azure **OIDC** (federated credentials, `id-token: write`) — no stored secrets beyond `AZURE_CLIENT_ID` / `AZURE_TENANT_ID` / `AZURE_SUBSCRIPTION_ID`.
- **`backend.yaml`** (manual `workflow_dispatch`): bootstraps the Terraform remote-state backend — creates RG `RG-Fozz-Management-weu`, storage account `safozzmanagementweu`, and `tfstate` container. Run once before Terraform.
- **`terraform.yaml`**: on push to `main` touching `.github/Terraform/**`, runs init/fmt/validate/plan/apply against the remote backend. Backend RG/storage names are hardcoded in the workflow env.
- **Terraform** (`main.tf` + `locals.tf`): provisions a Linux App Service plan (B1) and App Service (`fozz-appsvc`, NODE|20-lts) with a system-assigned identity. `strg.tf` (static-website storage) and `frontdoor.tf` (Front Door CDN) are fully commented out — earlier/alternative hosting approaches kept for reference, matching the blog tutorials.
- **`deploy.yaml`**: builds the app and deploys to the `fozz-appsvc` Web App on push to `main`. The artifact path is `./out`, matching the static export emitted by `next build` (`output: 'export'`).

### Deployment note

The site is a **static export** (`output: 'export'` → `out/`) deployed to the Linux **Node** App Service `fozz-appsvc` (`NODE|20-lts`). Since a static export has no Node server, `appservice.tf` sets `site_config.app_command_line` to `pm2 serve /home/site/wwwroot --no-daemon`, which serves the deployed static files. The `deploy.yaml` artifact path is `./out` to match. The commented-out storage static-website + Front Door config in `strg.tf`/`frontdoor.tf` is an alternative hosting approach that is intentionally kept in the repo but not in use.
