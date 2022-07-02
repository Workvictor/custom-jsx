const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const config = require('./webpack.config');
const createStyledComponentsTransformer = require('typescript-plugin-styled-components').default;

const mode = 'production';

const styledComponentsTransformer = createStyledComponentsTransformer({
  minify: true,
  identifiers: ['html', 'css'],
});

config.module.rules[0].options = {
  transpileOnly: false,
  getCustomTransformers: () => ({ after: [styledComponentsTransformer] }),
};

config.plugins.splice(
  0,
  1,
  new webpack.DefinePlugin({
    dev_mode: JSON.stringify(false),
  })
);

const common = {
  mode,
  devtool: undefined,
  stats: {
    ...config.stats,
    modules: true,
  },
};

const rendererConfig = {
  ...config,
  ...common,
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            passes: 3,
            drop_console: true,
            ecma: 8,
          },
          mangle: {
            properties: {
              keep_quoted: true,
              reserved: ['connectedCallback', 'disconnectedCallback'],
              // regex: /^\$\w+/,
            },
          },
          ecma: 8,
          module: true,
        },
      }),
      new CssMinimizerPlugin(),
    ],
  },
};

module.exports = rendererConfig;
