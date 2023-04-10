/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images:{
    domains: [ "assets.staticimg.com", "assets.coingecko.com", "t3.ftcdn.net"],
  }
}

module.exports = nextConfig
