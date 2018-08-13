const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const plugins = [
  new LodashModuleReplacementPlugin({
    flattening: true,
    paths: true,
    caching: true,
    memoizing: true,
    collections: true,
  }),
]

module.exports = {
  webpack: config => {
    plugins.map(plugin => config.plugins.push(plugin))

    return {
      ...config,
      // Fixes npm packages that depend on `fs` module
      node: {
        fs: 'empty',
      },
    }
  },
}
