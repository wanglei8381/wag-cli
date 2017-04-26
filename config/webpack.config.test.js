var devWebpackConfig = require("./webpack.config.dev");

var webpackConfig = Object.assign({}, devWebpackConfig, {
  devtool: '#inline-source-map'
})

delete webpackConfig.entry

module.exports = webpackConfig