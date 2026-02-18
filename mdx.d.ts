declare module "*.mdx" {
  import type { ComponentType } from "react"

  export const meta: {
    title: string
    excerpt: string
    date: string
  }

  const MDXComponent: ComponentType
  export default MDXComponent
}
