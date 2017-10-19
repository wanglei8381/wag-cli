const path = require("path")
const util = require("../util")
const webpack = require("webpack")
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devModuleRules = require("./webpack.config.dev").module.rules
const { userConfig, commonsChunkPath, webpackConfig } = require("./webpack.config.base")
const context = webpackConfig.context
let publicPath = userConfig.publicPath
// 默认自己公司的配置
if (!publicPath) {
  let publicDomain = '//static.wuage.com/'
  publicPath = publicDomain + path.basename(context).replace('style-', '') + '/'
}

let config = module.exports = Object.assign({}, webpackConfig, {
  output: Object.assign({}, webpackConfig.output, {
    publicPath: publicPath,
    // 输出的文件名 hash统一生成,chunkhash变化生成
    filename: userConfig.chunkhash ? '[name].[chunkhash:' + userConfig.chunkhash + '].js' : '[name].js'
  }),
  module: {
    rules: userConfig.extractCSS ? webpackConfig.module.rules.concat(
      // vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: util.extractVueStlye(),
          preserveWhitespace: false
        }
      },
      // style
      util.stlyeRules(userConfig["devtool"], true)
    ) : devModuleRules
  },
  plugins: [
    // 配置环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    // 对js进行压缩混淆
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    }),

    // 对css压缩
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // 当模块内容没有修改时，保持module.id不变
    new webpack.HashedModuleIdsPlugin()

    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json'
    // })
  ],
  // 上线设置source-map会影响加载速度,但便于线上bug查找
  devtool: userConfig["devtool"],

  //编译期间一旦出错就停止编译
  bail: true
})

// webpack3.0  模块作用域提升
if (webpack.optimize.ModuleConcatenationPlugin) {
  config.plugins.push(new webpack.optimize.ModuleConcatenationPlugin())
}

// 提取文件的公共部分
if (userConfig && userConfig.vendor) {
  var filename = userConfig.chunkhash ? 'common.[chunkhash:' + userConfig.chunkhash + '].js' : 'common.js'
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: commonsChunkPath + '/common',
      filename: commonsChunkPath + '/' + filename,
      minChunks: ({ resource }) => (
        resource &&
        ~resource.indexOf('node_modules') &&
        resource.match(/\.(jsx?|vue)$/)
      )
    })
  )

  // 提取异步共享的模块
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      async: true,
      minChunks: ({ resource }, count) => (
        resource &&
        ~resource.indexOf('node_modules') &&
        resource.match(/\.(jsx?|vue)$/)
      ) || (count > 1)
    })
  )
}

if (userConfig.extractCSS) {
  config.plugins.push(
    // 提取css,生成对应对文件
    new ExtractTextPlugin({
      filename: userConfig.chunkhash ? '[name].[chunkhash:' + userConfig.chunkhash + '].css' : '[name].css',
      allChunks: true
    }),
    // 提取的css可能存在重复的样式，去掉重复的
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  )
}

if (userConfig.index) {
  let filename = path.join(commonsChunkPath, 'index.html')
  config.plugins.push(
    //引入模版文件
    new HtmlWebpackPlugin({
      filename: filename,
      template: userConfig.index,
      inject: true,
    })
  )
}

if (userConfig.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  config.plugins.push(new BundleAnalyzerPlugin())
}