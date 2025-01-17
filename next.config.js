const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./app/i18n.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // This will ignore the problematic import
    config.resolve.alias['@mapbox/node-pre-gyp'] = false;
    return config;
  },
  typescript: {
    // Ignore TypeScript errors during build
    ignoreBuildErrors: true,
  }
}

module.exports = withNextIntl(nextConfig);

