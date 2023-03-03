/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images:{
    domains: [ "assets.staticimg.com"],
  }
}

module.exports = nextConfig
