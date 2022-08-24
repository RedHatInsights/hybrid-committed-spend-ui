const { resolve } = require('path');
const webpack = require('webpack');
const config = require('@redhat-cloud-services/frontend-components-config');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  ...(process.env.BETA && { deployment: 'beta/apps' }),
  ...(process.env.PROXY && {
    https: true,
    useProxy: true,
    proxyVerbose: true,
    env: `${process.env.ENVIRONMENT || 'stage'}-${
      process.env.BETA ? 'beta' : 'stable'
    }`, // for accessing prod-beta start your app with ENVIRONMENT=prod and BETA=true
    appUrl: process.env.BETA
      ? '/beta/staging/starter'
      : '/staging/starter',
    routes: {
      ...(process.env.CONFIG_PORT && {
        [`${process.env.BETA ? '/beta' : ''}/config`]: {
          host: `http://localhost:${process.env.CONFIG_PORT}`,
        },
      }),
      ...(process.env.LOCAL_API && {
        ...(process.env.LOCAL_API.split(',') || []).reduce((acc, curr) => {
          const [appName, appConfig] = (curr || '').split(':');
          const [appPort = 8003, protocol = 'http'] = appConfig.split('~');
          return {
            ...acc,
            [`/apps/${appName}`]: {
              host: `${protocol}://localhost:${appPort}`,
            },
            [`/insights/${appName}`]: {
              host: `${protocol}://localhost:${appPort}`,
            },
            [`/beta/insights/${appName}`]: {
              host: `${protocol}://localhost:${appPort}`,
            },
            [`/beta/apps/${appName}`]: {
              host: `${protocol}://localhost:${appPort}`,
            },
          };
        }, {}),
      }),
    },
  }),
});

plugins.push(
  require('@redhat-cloud-services/frontend-components-config/federated-modules')(
    {
      root: resolve(__dirname, '../'),
      useFileHash: false,
      exposes: {
        // Application root
        './RootApp': resolve(__dirname, '../src/AppEntry'),
      },
    }
  )
);

plugins.push(
  new webpack.DefinePlugin({
    IS_DEV: true,
  })
);

webpackConfig.resolve.alias = {
  ...webpackConfig.resolve.alias,
  reactRedux: resolve(__dirname, '../node_modules/react-redux'),
};

webpackConfig.module.rules = [
  ...webpackConfig.module.rules,
  {
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  },
];

webpackConfig.devServer.client.overlay = false;

module.exports = {
  ...webpackConfig,
  plugins,
};
