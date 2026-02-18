import type { MDXComponents } from "mdx/types"

// Define your components
export const components: MDXComponents = {
  wrapper: ({ children }: { children: React.ReactNode }) => (
    <div className="max-w-3xl mx-auto px-6 py-12 text-center">
      {children}
    </div>
  ),
  a: (props) => (
    <a
      {...props}
      className="text-blue-600 hover:text-blue-800 underline font-medium transition"
    />
  ),
  h1: (props) => <h1 className="text-4xl font-bold mb-4" {...props} />,
  h2: (props) => <h2 className="text-3xl font-semibold mb-3" {...props} />,
  p: (props) => <p className="mb-4 text-lg" {...props} />,
}

// Must export a useMDXComponents function exactly like this
export function useMDXComponents() {
  return components
}
