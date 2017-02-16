process.env.NODE_ENV = 'development';

const _ = require('lodash');
const $path = require('path');
const webpack = require('webpack');

const defaultConfig = require('./webpack.config');
const webpackConfig = Object.assign({}, defaultConfig)
const util = require('../src/util');

const dirname = process.cwd();
let commonsChunkPath = null;
let userConfig = null;
//屏蔽掉用户自定义选项
const excludeOptions = ['entry', 'output']

//用户自定义webpack配置
if (util.isFile($path.resolve(dirname, 'webpack.config.js'))) {
  let userWebpackConfig = require($path.resolve(dirname, 'webpack.config.js'));
  for (let key in userWebpackConfig) {
    if (excludeOptions.indexOf(key) === -1) {
      if (webpackConfig[key] && _.isPlainObject(webpackConfig[key])) {
        webpackConfig[key] = Object.assign({}, webpackConfig[key], userWebpackConfig[key])
      } else {
        webpackConfig[key] = userWebpackConfig[key]
      }
    }
  }
}

//用户自定义的文件入口
if (util.isFile($path.resolve(dirname, 'webpack.config.json'))) {
  userConfig = require($path.resolve(dirname, 'webpack.config.json'));
  _.forEach(userConfig.files, function (val, filePath) {
    if (val) {
      if (!_.includes(filePath, 'src')) {
        return console.warn('[build]编译失败', filePath + '中没有src目录');
      }
      commonsChunkPath = resolveEntry(filePath);
    }
  });
}

//用户参数传递入口
const args = process.argv.slice(2);
if (args) {
  _.forEach(args, function (filePath) {
    if (filePath && filePath[0] !== '-') {
      commonsChunkPath = resolveEntry(filePath);
    }
  });
}

if (!commonsChunkPath) {
  console.warn('[build]编译失败', '没有可编译的模块');
  process.exit(1);
} else {
  if (userConfig && userConfig.vendor && userConfig.vendor.length) {
    //提取文件的公共部分
    webpackConfig.entry[commonsChunkPath + '/common'] = config.vendor;
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(commonsChunkPath + '/common.js'));
  }
}

//处理文件入口问题
function resolveEntry (filePath) {
  let entryPath = filePath;

  if (!_.includes(filePath, '.')) {
    entryPath = $path.join(entryPath, 'index');
  } else {
    entryPath = entryPath.substring(0, entryPath.lastIndexOf('.'));
  }

  //如果目录有src,就将src换成dist,否则改为上一级目录添加dist
  if (entryPath.indexOf('src') > -1) {
    entryPath = entryPath.replace('src', 'dist');
  } else {
    entryPath = $path.resolve(entryPath, '../dist', $path.basename(entryPath))
  }

  webpackConfig.entry[$path.join(dirname, entryPath)] = $path.join(dirname, filePath);
  return entryPath.substring(0, entryPath.indexOf('dist') + 4);
}

module.exports = {
  webpackConfig: webpackConfig,
  userConfig: userConfig
}