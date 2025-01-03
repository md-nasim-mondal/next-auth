import type { NextConfig } from 'next';

const nextConfig: NextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // reactStrictMode: true,
  // pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  // i18n: {
  //   locales: ['en', 'bn'],
  //   defaultLocale: 'en',
  // },
  // webpack(config) {
  //   return config;
  // },
  // images: {
  //   domains: ['example.com'], // Replace with your image host domain
  // },
  // experimental: {
  //   turbo: {
  //     resolveAlias: {
  //       underscore: 'lodash',
  //       mocha: { browser: 'mocha/browser-entry.js' },
  //     },
  //     resolveExtensions: [
  //       '.mdx',
  //       '.tsx',
  //       '.ts',
  //       '.jsx',
  //       '.js',
  //       '.mjs',
  //       '.json',
  //     ],
  //   },
  // },
  
};

export default nextConfig;
