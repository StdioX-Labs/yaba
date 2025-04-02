/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Remove swcMinify as it's unrecognized in Next.js 15.2.4
  experimental: {
    webpackBuildWorker: true,
    optimizeCss: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config, { isServer }) => {
    // This helps break down the server bundle into smaller pieces
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 900000,
          cacheGroups: {
            vendors: false,
            default: false,
            lib: {
              test: /node_modules/,
              priority: 1,
            },
          },
        },
      };
    }
    return config;
  },
  typescript: {
    // Set this to true to temporarily ignore TypeScript errors during build
    ignoreBuildErrors: true,
  },
};

let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config');
} catch (e) {
  // ignore error
}

// Merge with existing config if available
if (userConfig && userConfig.default) {
  const originalConfig = { ...nextConfig };
  
  Object.keys(userConfig.default).forEach(key => {
    if (typeof originalConfig[key] === 'object' && !Array.isArray(originalConfig[key])) {
      nextConfig[key] = {
        ...originalConfig[key],
        ...userConfig.default[key],
      };
    } else {
      nextConfig[key] = userConfig.default[key];
    }
  });
}

export default nextConfig;