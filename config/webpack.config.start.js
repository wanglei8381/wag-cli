var webpackConfig = require("./webpack.config.dev");
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpack = require('webpack');
let util = require('../util/util');
let $path = require('path');
let FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk');
let userConfig = require('../config/webpack.config.base').userConfig;
let context = require('../config/webpack.config.base').webpackConfig.context;

if (!userConfig.index || !util.isFile($path.resolve(context, userConfig.index))) {
  console.log(chalk.bold.red('\n[wag][start]webpack.config的index配置不正确\n'));
  process.exit(1)
}

// add hot-reload related code to entry chunks
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = [$path.join(__dirname, 'webpack.client.js')].concat(webpackConfig.entry[name])
})

module.exports = Object.assign({}, webpackConfig, {
  output: Object.assign({}, webpackConfig.output, {
    publicPath: '/',
  }),
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
      template: userConfig.index
    }),
    new FriendlyErrorsPlugin()
  ]
})
