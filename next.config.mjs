/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  swcMinify: true,
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
};

let userConfig = undefined;
try {
  userConfig = await import('./v0-user-next.config');
} catch (e) {
  // ignore error
}

// Merge with existing config
if (userConfig && userConfig.default) {
  const originalConfig = { ...nextConfig };
  
  // Merge the configurations
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