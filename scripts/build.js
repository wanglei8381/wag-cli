process.env.NODE_ENV = 'production';

const _ = require('lodash');
const $path = require('path');
const webpack = require('webpack');

const defaultConfig = require('../config/webpack.config');
const webpackConfig = Object.assign({}, defaultConfig)
const util = require('../src/util');

const dirname = process.cwd();
let commonsChunkPath = null;
let userConfig = null;

//用户自定义webpack配置
if (util.isFile($path.resolve(dirname, 'webpack.config.js'))) {
  let userWebpackConfig = require($path.resolve(dirname, 'webpack.config.js'));
  for (let key in userWebpackConfig) {
    if (webpackConfig[key] && _.isPlainObject(webpackConfig[key])) {
      webpackConfig[key] = Object.assign({}, webpackConfig[key], userWebpackConfig[key])
    } else {
      webpackConfig[key] = userWebpackConfig[key]
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
      let entryPath = filePath;
      if (!_.includes(filePath, '.')) {
        entryPath = $path.join(entryPath, 'index');
      } else {
        entryPath = entryPath.substring(0, entryPath.lastIndexOf('.'));
      }
      entryPath = entryPath.replace('src', 'dist');
      webpackConfig.entry[$path.join(dirname, entryPath)] = $path.join(dirname, filePath);

      commonsChunkPath = entryPath.substring(0, entryPath.indexOf('dist') + 4);
    }
  });
}

if (!commonsChunkPath) {
  console.warn('[build]编译失败', '没有可编译的模块');
} else {

  if (userConfig && userConfig.vendor && userConfig.vendor.length) {
    //提取文件的公共部分
    webpackConfig.entry[commonsChunkPath + '/common'] = config.vendor;
    webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin(commonsChunkPath + '/common.js'));
  }

  webpackConfig.plugins.push(
    //混淆压缩
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      }
    })
  );

  webpack(webpackConfig, function (err, stats) {
    if (err)
      return console.log(err);

    var jsonStats = stats.toJson();
    if (jsonStats.errors.length > 0)
      console.log(jsonStats.errors);
    if (jsonStats.warnings.length > 0)
      console.log(jsonStats.warnings);

    console.log(stats.toString({
      chunks: false,
      colors: true
    }));
    console.log('[webpack:build] complete');
  });
}

