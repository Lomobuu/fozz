import Link from "next/link"

// Import each MDX article
import * as ephemeral from "./ephemeral/page.mdx"
import * as mdx from "./mdx/page.mdx"
import * as hosting from "./hosting/page.mdx"
import * as tfstate from "./tfstate/page.mdx"
import * as container from "./container/page.mdx"

type Post = {
  slug: string
  title: string
  date: Date
  excerpt: string
}

// Collect posts
const posts: Post[] = [
  {
    slug: "ephemeral",
    title: ephemeral.meta.title,
    date: new Date(ephemeral.meta.date),
    excerpt: ephemeral.meta.excerpt,
  },
  {
    slug: "mdx",
    title: mdx.meta.title,
    date: new Date(mdx.meta.date),
    excerpt: mdx.meta.excerpt,
  },
    {
    slug: "hosting",
    title: hosting.meta.title,
    date: new Date(hosting.meta.date),
    excerpt: hosting.meta.excerpt,
  },
      {
    slug: "container",
    title: container.meta.title,
    date: new Date(container.meta.date),
    excerpt: container.meta.excerpt,
  },
    {
    slug: "tfstate",
    title: tfstate.meta.title,
    date: new Date(tfstate.meta.date),
    excerpt: tfstate.meta.excerpt,
  }
].sort((a, b) => b.date.getTime() - a.date.getTime()) // newest first

export default function BlogPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="block rounded-xl border p-6 transition hover:scale-[1.02] hover:shadow-lg"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-1">{post.excerpt}</p>
              <p className="text-sm text-gray-500">{post.date.toLocaleDateString()}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
