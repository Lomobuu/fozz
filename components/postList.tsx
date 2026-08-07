"use client";

import { useState } from "react";
import Link from "next/link";
import NewBadge from "@/components/NewBadge";

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const POSTS_PER_PAGE = 5;

export default function PostList({ posts }: { posts: any[] }) {
  const [visiblePosts, setVisiblePosts] = useState(POSTS_PER_PAGE);
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    setLoading(true);

    setTimeout(() => {
      setVisiblePosts((prev) => prev + POSTS_PER_PAGE);
      setLoading(false);
    }, 300); // small delay for UX
  };

  return (
    <>
      <ul className="space-y-8">
        {posts.slice(0, visiblePosts).map((post) => (
          <li
            key={post.slug}
            className="opacity-0 animate-[fadeIn_0.4s_ease_forwards]"
          >
            <Link
              href={`/blog/${post.slug}`}
              className={
                post.isNew
                  ? "block rounded-xl border border-transparent p-6 transition hover:scale-[1.02] ring-2 ring-orange-400/70 bg-gradient-to-br from-rose-500/10 via-orange-500/10 to-yellow-500/10 shadow-lg shadow-orange-500/20 hover:shadow-xl hover:shadow-orange-500/30"
                  : "block rounded-xl border p-6 transition hover:scale-[1.02] hover:shadow-lg"
              }
            >
              <h2 className="text-2xl font-semibold mb-2 flex items-center flex-wrap gap-y-2">
                {post.isNew && <NewBadge />}
                <span
                  className={
                    post.isNew
                      ? "bg-gradient-to-r from-rose-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent font-bold"
                      : undefined
                  }
                >
                  {post.title}
                </span>
              </h2>

                <p className="text-sm text-gray-500 mb-3">
                {formatDate(post.date)}
                </p>

              <p className="text-muted-foreground mb-1">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>

      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-12">
          <button
            onClick={loadMore}
            className="px-6 py-3 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-800 transition flex items-center gap-2"
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </>
  );
}