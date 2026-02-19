// components/MDXWrapper.tsx
import type { ReactNode } from "react";

export default function MDXWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="prose prose-lg dark:prose-invert mx-auto px-6 py-12">
      {children}
    </div>
  );
}
