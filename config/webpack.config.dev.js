var path = require("path");
var webpack = require("webpack");
var autoprefixer = require('autoprefixer');
var webpackConfig = require("./webpack.config.base").webpackConfig;
let context = webpackConfig.context

module.exports = Object.assign({}, webpackConfig, {
  output: Object.assign({}, webpackConfig.output, {

    //在生成的文件中添加原来文件的名字,方便调试
    pathinfo: true

  }),
  module: {
    rules: webpackConfig.module.rules.concat([
      //vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        include: context,
        options: {
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
        use: ['style-loader', 'css-loader', {
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
      },

      //stylus
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader', {
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
      },
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devtool: '#cheap-module-eval-source-map',
  performance: {
    hints: false
  },
  watch: true
})
