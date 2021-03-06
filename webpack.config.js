const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

const devtool = 'inline-source-map';

const tsLoader = {
  test: /\.(ts|tsx)$/,
  loader: 'ts-loader',
  options: { transpileOnly: true },
  exclude: '/node_modules/',
};

const filename = '[name].js';

const extensions = ['.js', '.ts', '.tsx', '.css'];

const stats = {
  modules: false,
  reasons: false,
  moduleTrace: false,
  entrypoints: false,
};

const rendererConfig = {
  target: ['web', 'electron-renderer'],
  mode: 'development',
  devtool,
  devServer: {
    static: './dist',
  },
  entry: {
    index: {
      import: './src/index.ts',
      filename,
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      dev_mode: JSON.stringify(true),
    }),
    new webpack.DefinePlugin({
      app_ver: JSON.stringify(pkg.version),
    }),
    new webpack.DefinePlugin({
      app_title: JSON.stringify(pkg.displayName),
    }),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // template: './src/index.html',
    }),
  ],
  module: {
    rules: [
      tsLoader,
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(ttf|wav|mp3|ogg|flac|jpg|png|svg|html|json)$/,
        type: 'asset/resource',
        generator: {
          filename: 'data/[hash:4][ext]',
        },
        exclude: [path.resolve(__dirname, 'src/index.html')],
      },
    ],
  },
  resolve: {
    extensions,
    alias: {
      src: path.resolve(__dirname, './src/'),
    },
  },
  stats,
};

module.exports = rendererConfig;
