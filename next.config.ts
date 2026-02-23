import createMDX from '@next/mdx'
import type { NextConfig } from 'next'

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
} satisfies NextConfig

export default createMDX({
  extension: /\.(md|mdx)$/,
})(nextConfig)
