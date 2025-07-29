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
  // Allow cross-origin requests from your deployed domain
  allowedDevOrigins: [
    'propayn.varuntd.com',
    'https://propayn.varuntd.com',
    'http://propayn.varuntd.com',
    'propayn-gateway.varuntd.com',
    'https://propayn-gateway.varuntd.com',
    'http://propayn-gateway.varuntd.com',
    'bank-simulator.varuntd.com',
    'https://bank-simulator.varuntd.com',
    'http://bank-simulator.varuntd.com'
  ],
};
