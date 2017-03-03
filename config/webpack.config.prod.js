let path = require("path");
let webpack = require("webpack");
var autoprefixer = require('autoprefixer');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
// let ManifestPlugin = require("webpack-manifest-plugin");
// let HtmlWebpackPlugin = require('html-webpack-plugin');
let webpackConfig = require("./webpack.config.base").webpackConfig;
let devModuleRules = require("./webpack.config.dev").module.rules;
let commonsChunkPath = require("./webpack.config.base").commonsChunkPath;
let userConfig = require("./webpack.config.base").userConfig;
let context = webpackConfig.context
const dirname = process.cwd();

let config = module.exports = Object.assign({}, webpackConfig, {
  output: Object.assign({}, webpackConfig.output, {

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
          },
          postcss: [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9', // Vue doesn't support IE8 anyway
              ]
            })
          ]
        }
      },

      //css
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: function () {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // Vue doesn't support IE8 anyway
                    ]
                  })
                ]
              }
            }
          }]
        })
      },

      //stylus
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'stylus-loader', {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: function () {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // Vue doesn't support IE8 anyway
                    ]
                  })
                ]
              }
            }
          }]
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

    //引入模版文件
    // new HtmlWebpackPlugin({
    //   template: './index.html',
    //   minify: {
    //     quoteCharacter: '"',
    //     collapseWhitespace: true,
    //     removeRedundantAttributes: true,
    //     useShortDoctype: true,
    //     removeEmptyAttributes: true,
    //     removeStyleLinkTypeAttributes: true,
    //     minifyJS: true,
    //     minifyCSS: true,
    //     minifyURLs: true
    //   }
    // }),

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
    new ExtractTextPlugin(userConfig.chunkhash ? '[name].[chunkhash:' + userConfig.chunkhash + '].css' : '[name].css')
  )
}