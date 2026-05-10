/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // If deploying to a project repo (e.g. username.github.io/portfolio),
  // uncomment and set: basePath: '/portfolio',
};

export default nextConfig;
