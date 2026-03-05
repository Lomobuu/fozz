import { allPosts } from "../../.contentlayer/generated";
import PostList from "@/components/postList"

export default function BlogPage() {
  const posts = [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <main className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Blog</h1>

      <PostList posts={posts} />
    </main>
  );
}