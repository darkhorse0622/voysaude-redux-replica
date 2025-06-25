/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/typeform/:path*',
        destination: 'https://api.typeform.com/:path*',
      },
    ];
  },
  images: {
    domains: ['api.typeform.com'],
  },
};

export default nextConfig;