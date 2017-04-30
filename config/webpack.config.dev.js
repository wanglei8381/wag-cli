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
        include: context
      },

      //css
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },

      //stylus
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader']
      }
    ])
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    })
  ],
  devtool: '#cheap-module-source-map',
  performance: {
    hints: false
  },
  watch: true
})
