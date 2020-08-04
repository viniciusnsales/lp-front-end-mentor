const path = require('path')
const glob = require('glob')

const settings = require('./settings')
const webpack = require('webpack')
const WebpackBar = require('webpackbar')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const paths = []
const generateHTMLPlugins = () =>
  glob.sync('./src/**/*.html').map((dir) => {
    const filename = path.basename(dir)

    paths.push(filename)

    return new HtmlWebpackPlugin({
      template: path.resolve(__dirname, settings.paths.src, filename),
      filename,
      title: settings.title,
      minify: false,
      inject: true,
    })
  })

module.exports = {
  entry: {
    app: [
      '@babel/polyfill',
      path.resolve(__dirname, settings.paths.src, 'js', 'vendors.js'),
      path.resolve(__dirname, settings.paths.src, 'js', 'app.js'),
    ],
    theme: path.resolve(__dirname, settings.paths.src, 'styles', 'theme.scss'),
  },

  output: {
    path: settings.paths.build,
    filename: path.join('js', '[name].js'),
    publicPath: '/',
  },

  stats: {
    colors: true,
  },

  plugins: [
    new WebpackBar({
      color: '#006aff',
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
    new MiniCssExtractPlugin({
      filename: path.join('styles', '[name].css?[hash]'),
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: settings.paths.static,
          to: settings.paths.build,
        },
      ],
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    ...generateHTMLPlugins(),
  ],

  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: ['html-loader'],
      },

      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },

      {
        test: /\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]?[hash]',
          },
        },
      },
    ],
  },
}
