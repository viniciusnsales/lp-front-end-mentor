const path = require('path')
const settings = require('./settings')

const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const WebappWebpackPlugin = require('webapp-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const ImageMinPlugin = require('imagemin-webpack-plugin').default
const ImageMinMozjpeg = require('imagemin-mozjpeg')

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  stats: 'errors-only',

  output: {
    path: settings.paths.build,
    publicPath: './',
  },

  plugins: [
    new WebappWebpackPlugin({
      logo: path.resolve(settings.paths.static, 'images', 'favicon.svg'),
      outputPath: path.join('favicons'),
      prefix: path.join('favicons'),
      favicons: {
        appName: settings.name,
        appDescription: settings.name,
        lang: 'pt-BR',
        developerName: null,
        developerURL: null,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: false,
          coast: false,
          favicons: true,
          firefox: false,
          windows: false,
          yandex: false,
        },
      },
    }),
    new ImageMinPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      gifsicle: {
        optimizationLevel: 9,
      },
      pngquant: {
        quality: '75',
      },
      plugins: [
        ImageMinMozjpeg({
          quality: '75',
        }),
      ],
    }),
    // new HtmlWebpackPlugin(),
    new HtmlBeautifyPlugin({
      config: {
        html: {
          indent_size: 2,
        },
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },

  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: true,
        parallel: false,
        sourceMap: false,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](lodash|jquery|bootstrap|imask)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
