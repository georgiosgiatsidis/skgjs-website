/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  env: {
    TEBI_ACCESS_KEY_ID: process.env.TEBI_ACCESS_KEY_ID,
    TEBI_SECRET_ACCESS_KEY: process.env.TEBI_SECRET_ACCESS_KEY,
    TEBI_BUCKET_NAME: process.env.TEBI_BUCKET_NAME,
  },
}

module.exports = nextConfig
