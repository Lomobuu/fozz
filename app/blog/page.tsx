import Link from "next/link";
import { allPosts } from "../../.contentlayer/generated"

export default function BlogPage() {
  const posts = allPosts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

      <ul className="space-y-8">
        {posts.map((post: any) => (
             <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="block rounded-xl border p-6 transition hover:scale-[1.02] hover:shadow-lg"
              >
                <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>

                <p className="text-muted-foreground mb-1">
                  {post.excerpt}
                </p>

                <p className="text-sm text-gray-500">
                </p>
              </Link>
            </li>
        ))}
      </ul>
    </main>
  )
}
