let path = require("path");
let webpack = require("webpack");
var autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let ManifestPlugin = require("webpack-manifest-plugin");
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpackConfig = require("./webpack.config.base").webpackConfig;
let devModuleRules = require("./webpack.config.dev").module.rules;
let commonsChunkPath = require("./webpack.config.base").commonsChunkPath;
let userConfig = require("./webpack.config.base").userConfig;
let context = webpackConfig.context
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
    rules: userConfig.extractCSS ? webpackConfig.module.rules.concat([
      //vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: context,
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            stylus: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ['css-loader', 'stylus-loader']
            })
          }
        }
      },

      //css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", 'postcss-loader']
        })
      },

      //stylus
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'postcss-loader', 'stylus-loader']
        })
      }
    ]) : devModuleRules
  },
  plugins: [
    //配置环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),

    //对js进行压缩混淆
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_debugger: true,
        drop_console: true
      },
      sourceMap: true
    }),

    //对css压缩
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),

    // new ManifestPlugin({
    //   fileName: 'asset-manifest.json'
    // })
  ],
  //上线设置source-map会影响加载速度,但便于线上bug查找
  devtool: userConfig["devtool"],

  //编译期间一旦出错就停止编译
  bail: true
})

if (userConfig && userConfig.vendor && userConfig.vendor.length) {
  //提取文件的公共部分
  // commonsChunkPath = path.resolve(dirname, commonsChunkPath);
  let filename = userConfig.chunkhash ? 'common.[chunkhash:' + userConfig.chunkhash + '].js' : 'common.js'
  config.entry['vendor'] = userConfig.vendor;
  config.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: commonsChunkPath + '/' + filename,
    })
  );
}

if (userConfig.extractCSS) {
  config.plugins.push(
    //提取css,生成对应对文件
    new ExtractTextPlugin(userConfig.chunkhash ? '[name].[chunkhash:' + userConfig.chunkhash + '].css' : '[name].css'),
    //提取的css可能存在重复的样式，去掉重复的
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
  )
}