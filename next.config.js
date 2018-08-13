const path = require('path')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

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
  webpack: (config, { dev }) => {
    plugins.map(plugin => config.plugins.push(plugin))

    // Enable only in Production
    if (!dev) {
      // Service Worker
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          filename: 'service-worker.js',
          minify: false,
          staticFileGlobsIgnorePatterns: [/\.next\//],
          importScripts: [],
          staticFileGlobs: [
            'static/**/*', // Precache all static files by default
          ],
          forceDelete: true,
          runtimeCaching: [
            {
              urlPattern: /[.](png|jpg|jpeg|ico|svg|css)/,
              handler: 'fastest',
            },
            {
              urlPattern: /^http.*/, // cache all files
              handler: 'networkFirst',
            },
          ],
        })
      )
    }

    const oldEntry = config.entry
    return {
      ...config,
      // add entry to bundle
      entry: async () => {
        const entries = await oldEntry()

        if (entries['main.js']) {
          entries['main.js'].push(path.resolve('./scripts/register-service-worker.js'))
        }

        return entries
      },
      // Fixes npm packages that depend on `fs` module
      node: {
        fs: 'empty',
      },
    }
  },
}
