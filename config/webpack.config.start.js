var webpackConfig = require("./webpack.config.dev");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let util = require('../util/util');
let $path = require('path');
const chalk = require('chalk');
let userConfig = require('../config/webpack.config.base').userConfig;
const dirname = process.cwd();

if (!userConfig.index || !util.isFile($path.resolve(dirname, userConfig.index))) {
  console.log(chalk.bold.red('\n[wag][start]webpack.config的index配置不正确\n'));
  process.exit(1)
}

module.exports = Object.assign({}, webpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),

    //引入模版文件
    new HtmlWebpackPlugin({
      template: './' + userConfig.index,
      minify: {
        quoteCharacter: '"',
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    })
  ]
})
