var path = require("path");
var webpack = require("webpack");
var webpackConfig = require("./webpack.config.base").webpackConfig;
let context = webpackConfig.context

module.exports = Object.assign({}, webpackConfig, {
  output: {

    // 静态文件访问路径
    publicPath: '/',

    //输出文件的地址
    path: '/',

    // 输出的文件名 hash统一生成,chunkhash变化生成
    filename: "[name].js",

    //在生成的文件中添加原来文件的名字,方便调试
    pathinfo: true

  },
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
        use: ['style-loader', 'css-loader']
      },

      //stylus
      {
        test: /\.styl$/,
        use: ['style-loader', 'css-loader', 'stylus-loader']
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
  devtool: 'cheap-module-source-map',
  performance: {
    hints: false
  },
  watch: true
})
