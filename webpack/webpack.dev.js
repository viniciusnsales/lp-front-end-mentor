const path = require('path')
const webpack = require('webpack')
const settings = require('./settings')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, settings.paths.src),
    watchContentBase: true,
    inline: true,
    hot: true,
    port: settings.port,
    host: settings.devHost,
  },
  watchOptions: {
    ignored: ['.DS_Store', '.gitkeep'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, settings.paths.src),
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        },
      },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, settings.paths.src),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
})
