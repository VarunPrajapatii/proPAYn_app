/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ["@propayn/ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
