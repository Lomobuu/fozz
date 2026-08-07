import { allPosts } from "../../../.contentlayer/generated";
import { notFound } from "next/navigation";
import MDXContent from "@/components/MDXContent"
import NewBadge from "@/components/NewBadge";


export function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });


export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = allPosts.find((p) => p.slug === slug);

  if (!post) notFound();

  // Client component renders MDX
return (
  <article className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12 py-16">
    <header className="mb-12">
      <h1 className="text-4xl font-bold mb-2 flex items-center flex-wrap">
        {post.isNew && <NewBadge />}
        {post.title}
      </h1>

      <p className="text-sm text-gray-500">
        {formatDate(post.date)}
      </p>
    </header>

    <MDXContent code={post.body.code} />
  </article>
);
}