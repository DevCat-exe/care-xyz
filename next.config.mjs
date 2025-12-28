/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: 'images.unsplash.com' },
      { hostname: 'www.google.com' },
      { hostname: 'i.pravatar.cc' },
    ],
  },
};

export default nextConfig;
