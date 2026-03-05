import { allPosts } from "../../../.contentlayer/generated";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent"

// Static generation
export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Server component
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // unwrap params
  const { slug } = await params;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 py-16">
      {/* Client component renders MDX */}
      <MDXContent code={post.body.code} />
    </article>
  );
}