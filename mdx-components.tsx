// mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import BlogImage from "@/components/BlogImage";
import CodeBlock from "./components/CodeBlock";
import { List, ListItem } from "@/components/List";
import MDXLink from "@/components/mdxLink";
import TechStack from "@/components/svg";
import Prerequisites from "@/components/prereq";
import NewBadge from "@/components/NewBadge";

export const components: MDXComponents = {
  code: CodeBlock,
  BlogImage,
  TechStack,
  Prerequisites,
  NewBadge,
  img: (props) => <BlogImage src={props.src ?? ""} alt={props.alt ?? ""} size="large" />,
  a: MDXLink,
  h1: (props) => <h1 {...props} className="font-heading text-4xl font-bold mt-12 mb-4 " />,
  h2: (props) => <h2 {...props} className="font-heading text-2xl font-semibold mt-6 mb-4" />,
  h3: (props) => <h3 {...props} className="font-heading text-3xl font-semibold mt-8 mb-4" />,
  p: (props) => <p {...props} className="font-sansleading-relaxed mb-4" />,
  ol: (props) => <List type="ordered" {...props} />,
  ul: (props) => <List type="unordered" {...props} />,
  li: ListItem,
};

// Required for Next.js App Router + MDX
export function useMDXComponents() {
  return components;
}
