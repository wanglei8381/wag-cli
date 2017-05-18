var devWebpackConfig = require("./webpack.config.dev");
var webpack = require("webpack");

var webpackConfig = Object.assign({}, devWebpackConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"testing"'
      }
    })
  ]
})

delete webpackConfig.entry

module.exports = webpackConfig