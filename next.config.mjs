/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'storage.googleapis.com', port: '', pathname: '/talmo-image-bucket/**' }],
  },
};

export default nextConfig;
