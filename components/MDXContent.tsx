"use client"; // This must be a client component to use hooks

import { useMDXComponent } from "next-contentlayer/hooks";
import { components } from "@/mdx-components"

interface MDXContentProps {
  code: string; // The compiled MDX code from Contentlayer
}

export default function MDXContent({ code }: MDXContentProps) {
  // Hook to get the React component from MDX code
  const Component = useMDXComponent(code);

  // Pass your custom components to MDX runtime
  return <Component components={components} />;
}