const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const srcDir = path.resolve(__dirname, './src');
const distDir = path.resolve(__dirname, './dist/');
const fileRegEx = /\.(png|woff|woff2|eot|ttf|svg|gif|jpe?g|png)(\?[a-z0-9=.]+)?$/;
const stats = {
  excludeAssets: fileRegEx,
  colors: true,
  modules: false,
};

// Show what files changed since last compilation
class WatchRunPlugin {
  apply(compiler) {
    compiler.hooks.watchRun.tap('WatchRun', comp => {
      if (comp.modifiedFiles) {
        const changedFiles = Array.from(comp.modifiedFiles, file => `\n  ${file}`).join('');
        const logger = compiler.getInfrastructureLogger('cost-management');
        logger.info(' ');
        logger.info('===============================');
        logger.info('FILES CHANGED:', changedFiles);
        logger.info('===============================');
      }
    });
  }
}

module.exports = {
  appUrl: '/business-services/hybrid-committed-spend',
  debug: true,
  proxyVerbose: true,
  stats,
  // useCache: true,
  useProxy: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [
    new WatchRunPlugin(),
    new webpack.ProgressPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(srcDir, 'locales'),
          to: path.join(distDir, 'locales'),
        },
      ],
    }),
  ],
  routes: {
    /**
     * Cloud services config routes, typically localhost:8889
     */
    ...(process.env.CLOUD_SERVICES_CONFIG_PORT && {
      '/config': { host: `http://localhost:${process.env.CLOUD_SERVICES_CONFIG_PORT}` },
      '/beta/config': { host: `http://localhost:${process.env.CLOUD_SERVICES_CONFIG_PORT}` },
    }),
  },
};
