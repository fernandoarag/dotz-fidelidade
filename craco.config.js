const path = require('node:path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@application': path.resolve(__dirname, 'src/application'),
      '@core': path.resolve(__dirname, 'src/core'),
      '@infrastructure': path.resolve(__dirname, 'src/infrastructure'),
      '@presentation': path.resolve(__dirname, 'src/presentation'),
      '@components': path.resolve(__dirname, 'src/presentation/components'),
      '@contexts': path.resolve(__dirname, 'src/presentation/contexts'),
      '@hooks': path.resolve(__dirname, 'src/presentation/hooks'),
      '@pages': path.resolve(__dirname, 'src/presentation/pages'),
    },
  },
};
