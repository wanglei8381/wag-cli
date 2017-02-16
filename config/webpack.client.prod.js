process.env.NODE_ENV = 'production';

const _ = require('lodash');
const $path = require('path');
const webpack = require('webpack');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackClientDev = require('./webpack.client.dev')

const webpackConfig = webpackClientDev.webpackConfig;
const userConfig = webpackClientDev.userConfig;

//处理插件
webpackConfig.plugins.push(
  //混淆压缩
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_debugger: true,
      drop_console: true
    },
    mangle: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"',
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new ProgressBarPlugin()
);

if (userConfig && userConfig.extractText) {

  webpackConfig.module.loaders.map(loader => {
    if (loader.name === 'css') {
      return Object.assign({}, loader, {
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          {allChunks: true}
        )
      });
    } else if (loader.name === 'styl') {
      return Object.assign({}, loader, {
        loader: ExtractTextPlugin.extract(
          'style-loader',
          'css-loader',
          'stylus-loader',
          {allChunks: true}
        )
      });
    }
    return loader;
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].css')
  )
}

webpackConfig.devtool = null;

module.exports = {
  webpackConfig: webpackConfig,
  userConfig: userConfig
}