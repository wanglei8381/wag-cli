const webpackConfig = require("./webpack.config.dev")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const util = require('../util')
const $path = require('path')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const chalk = require('chalk')
const userConfig = require('./webpack.config.base').userConfig
const context = webpackConfig.context
const webpackClientPath = $path.join(__dirname, 'webpack.client.js')

// 检查index入口文件是否存在
if (!userConfig.index || !util.isFile($path.resolve(context, userConfig.index))) {
  console.log(chalk.bold.red('\n[wag][start]webpack.config的index配置不正确\n'));
  process.exit(1)
}

// 对每一个入口文件添加 hot-reload 依赖
Object.keys(webpackConfig.entry).forEach(function (name) {
  webpackConfig.entry[name] = [webpackClientPath].concat(webpackConfig.entry[name])
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
