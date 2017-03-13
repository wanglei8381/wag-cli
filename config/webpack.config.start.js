var webpackConfig = require("./webpack.config.dev");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let util = require('../util/util');
let $path = require('path');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk');
let userConfig = require('../config/webpack.config.base').userConfig;
const dirname = process.cwd();

if (!userConfig.index || !util.isFile($path.resolve(dirname, userConfig.index))) {
  console.log(chalk.bold.red('\n[wag][start]webpack.config的index配置不正确\n'));
  process.exit(1)
}

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = [$path.join(__dirname, 'webpack.client.js')].concat(webpackConfig.entry[name])
})

module.exports = Object.assign({}, webpackConfig, {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    }),
    new FriendlyErrorsPlugin()
  ]
})
