const path = require("path")
const webpack = require("webpack")
const _ = require('lodash')
const util = require('../util')
const chalk = require('chalk')

const dirname = process.cwd()
const userConfig = readUserConfig(dirname)
const { webpackConfig, commonsChunkPath } = generateWebpackConfig(userConfig)

function readUserConfig (dirname) {
  return util.isFile(path.resolve(dirname, 'wag.config.js')) ? require(path.resolve(dirname, 'wag.config'))
    : require(path.resolve(dirname, 'webpack.config'))
}

function generateWebpackConfig ({ context = dirname, runtimeOnly = true, files, exclude }) {
  if (!files || !_.isPlainObject(files)) {
    throw new Error('编译失败,没有可编译的模块，检查files入口文件配置')
  }

  // 在多页面配置中一般只会有一个入口文件，如果有多个入口文件，在提取公共代码时，生成的文件在最后一个入口文件夹下
  let commonsChunkPath
  let entry = {}
  _.each(files, (val, filePath) => {
    if (val) {
      if (!_.includes(filePath, 'src')) {
        throw '编译失败', filePath + '中没有src目录'
      }
      commonsChunkPath = resolveEntry(entry, filePath)
    }
  })

  // 排除的目录
  exclude = _.isObject(exclude) ? exclude : exclude ? /node_modules/ : undefined

  const webpackConfig = {
    // 根目录,entry的入口文件
    context,
    // string | object | array
    entry,
    output: {
      // 静态文件访问路径
      publicPath: './',
      // 输出文件的地址
      path: context,
      // 输出的文件名 hash统一生成,chunkhash变化生成
      filename: '[name].js',
      // 输出块的名字
      chunkFilename: commonsChunkPath + '/[name].[chunkhash:8].js'
    },
    resolve: {
      extensions: ['.js', '.json', '.vue', '.jsx'],
      alias: {
        'vue$': `vue/dist/vue.${runtimeOnly === false ? '' : 'runtime.'}esm.js`,
        'components': path.join(context, 'components'),
        'pages': path.join(context, 'pages'),
        '@': path.resolve(context)
      }
    },
    module: {
      rules: [
        // linter:standard
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
          exclude: exclude,
          options: {
            cacheDirectory: true
          }
        },

        // "file" loader for svg
        {
          test: /\.svg$/,
          loader: 'file-loader',
          options: {
            publicPath: './',
            outputPath: commonsChunkPath + '/',
            name: '[name].[hash:8].[ext]'
          }
        },

        // 模版
        {
          test: /\.html$/,
          loader: 'html-loader'
        },

        // 其他
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
  }

  return {
    webpackConfig,
    commonsChunkPath
  }
}

// 处理文件入口路径问题
function resolveEntry (entry, filePath) {
  let entryPath = filePath;

  if (!_.includes(filePath, '.')) {
    entryPath = path.join(entryPath, 'index')
  } else {
    entryPath = entryPath.substring(0, entryPath.lastIndexOf('.'))
  }

  // 如果目录有src,就将src换成dist,否则改为上一级目录添加dist
  if (entryPath.indexOf('src') > -1) {
    entryPath = entryPath.replace('src', 'dist')
  } else {
    entryPath = path.resolve(entryPath, '../dist', path.basename(entryPath))
  }

  entry[entryPath] = './' + filePath
  return entryPath.substring(0, entryPath.indexOf('dist') + 4)
}

module.exports = {
  userConfig,
  webpackConfig,
  commonsChunkPath
}