// components/MDXWrapper.tsx
import type { ReactNode } from "react";

export default function MDXWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black" />

      {/* Article container */}
      <div className="relative max-w-4xl mx-auto px-6 py-16">
        <div className="rounded-2xl shadow-xl bg-white/90 dark:bg-gray-900/80 backdrop-blur-md border border-gray-200/50 dark:border-gray-800/60 p-10 prose prose-lg dark:prose-invert">
          {children}
        </div>
      </div>
    </div>
  );
}