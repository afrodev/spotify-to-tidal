/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['i.scdn.co', 'resources.tidal.com', 'images.unsplash.com'],
  },
}

module.exports = nextConfig