import createMDX from '@next/mdx'
import type { NextConfig } from 'next'
import { withContentlayer } from "next-contentlayer";

const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  output: 'export',
  images: {
    unoptimized: true,
  },
} satisfies NextConfig

export default withContentlayer(nextConfig);
