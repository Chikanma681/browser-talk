/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', 'lucide-react'],
  },
}

export default nextConfig