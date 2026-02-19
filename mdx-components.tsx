// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import BlogImage from "@/components/BlogImage";

export const components: MDXComponents = {
  BlogImage,
  img: (props) => <BlogImage src={props.src ?? ""} alt={props.alt ?? ""} size="large" />,
  a: (props) => (
    <a {...props} className="text-blue-600 hover:text-blue-800 underline font-medium transition" />
  ),
  h1: (props) => <h1 {...props} className="text-4xl font-bold mt-8 mb-6" />,
  h2: (props) => <h2 {...props} className="text-3xl font-semibold mt-8 mb-4" />,
};

// Required for Next.js App Router + MDX
export function useMDXComponents() {
  return components;
}
