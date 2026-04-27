/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  turbopack: {
    root: __dirname,
  },
}

module.exports = nextConfig
