const path = require("path");
const webpack = require("webpack");
const _ = require('lodash');
const util = require('../util/util');
const chalk = require('chalk');

const dirname = process.cwd();
// 用户自定义的文件入口
let userConfig
if (util.isFile(path.resolve(dirname, 'wag.config.js'))) {
  userConfig = require(path.resolve(dirname, 'wag.config'));
} else {
  userConfig = require(path.resolve(dirname, 'webpack.config'));
}
const context = userConfig.context || dirname;
let commonsChunkPath;

let webpackConfig = {

  // 根目录,entry的入口文件
  context: context,

  // string | object | array
  entry: {},

  output: {

    // 静态文件访问路径
    publicPath: './',

    // 输出文件的地址
    path: context,

    // 输出的文件名 hash统一生成,chunkhash变化生成
    filename: "[name].js",

    chunkFilename: "[name].[chunkhash:8].js"
  },

  resolve: {

    //文件扩展
    extensions: ['.js', '.json', '.vue', '.jsx'],

    alias: {
      'components': path.join(context, 'components'),
      'pages': path.join(context, 'pages'),
      '@': path.resolve(context)
    }
  },

  module: {}
};

_.forEach(userConfig.files, function (val, filePath) {
  if (val) {
    if (!_.includes(filePath, 'src')) {
      return console.warn('[build]编译失败', filePath + '中没有src目录');
    }
    commonsChunkPath = resolveEntry(filePath);
  }
});

// 处理文件入口问题
function resolveEntry (filePath) {
  let entryPath = filePath;

  if (!_.includes(filePath, '.')) {
    entryPath = path.join(entryPath, 'index');
  } else {
    entryPath = entryPath.substring(0, entryPath.lastIndexOf('.'));
  }

  //如果目录有src,就将src换成dist,否则改为上一级目录添加dist
  if (entryPath.indexOf('src') > -1) {
    entryPath = entryPath.replace('src', 'dist');
  } else {
    entryPath = path.resolve(entryPath, '../dist', path.basename(entryPath))
  }

  // webpackConfig.entry[path.join(dirname, entryPath)] = path.join(dirname, filePath);
  webpackConfig.entry[entryPath] = './' + filePath;
  return entryPath.substring(0, entryPath.indexOf('dist') + 4);
}

if (!commonsChunkPath) {
  console.log(chalk.bold.red('\n[wag][build]编译失败,没有可编译的模块\n'));
  process.exit(1);
}

// webpackConfig.output.path = path.resolve(context, commonsChunkPath)
// 改变块输出目录
webpackConfig.output.chunkFilename = commonsChunkPath + '/' + webpackConfig.output.chunkFilename

webpackConfig.module = {
  rules: [
    //linter:standard
    {
      test: /\.(jsx?|vue)$/,
      enforce: 'pre',
      loader: 'eslint-loader',
      exclude: /node_modules/,
      include: context
    },

    //babel
    {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: _.isObject(userConfig.exclude) ? userConfig.exclude : userConfig.exclude ? /node_modules/ : undefined,
      options: {
        cacheDirectory: true
      }
    },

    //"file" loader for svg
    {
      test: /\.svg$/,
      loader: 'file-loader',
      options: {
        publicPath: './',
        outputPath: commonsChunkPath + '/',
        name: '[name].[hash:8].[ext]'
      }
    },

    //模版
    {
      test: /\.html$/,
      loader: 'html-loader'
    },

    //其他
    {
      exclude: [
        /\.html$/,
        /\.vue$/,
        /\.(js|jsx)$/,
        /\.css$/,
        /\.styl$/,
        /\.json$/,
        /\.svg$/
      ],
      loader: 'url-loader',
      options: {
        limit: 10000,
        publicPath: './',
        outputPath: commonsChunkPath + '/',
        name: '[name].[hash:8].[ext]'
      }
    }
  ]
}

if (userConfig.runtimeOnly === false) {
  webpackConfig.resolve.alias.vue$ = 'vue/dist/vue.common.js'
}

module.exports = {
  userConfig,
  webpackConfig,
  commonsChunkPath
}