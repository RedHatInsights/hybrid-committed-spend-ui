module.exports = {
  appUrl: '/business-services/hybrid-committed-spend',
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  routes: {
    ...(process.env.CONFIG_PORT && {
      '/config': { host: `http://localhost:${process.env.CONFIG_PORT}` },
      '/beta/config': { host: `http://localhost:${process.env.CONFIG_PORT}` },
    }),
  },
};
