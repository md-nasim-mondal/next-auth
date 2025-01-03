import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  basePath: '/myapp',
  i18n: {
    locales: ['en', 'bn'],
    defaultLocale: 'en',
  },
  webpack(config) {
    return config;
  },
  images: {
    domains: ['example.com'], // Replace with your image host domain
  },
};

export default nextConfig;
