var webpack = require('webpack');
var _ = require('lodash');

module.exports = {
  entry: {},
  output: {
    path: '/',
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  },
  resolve: {
    extensions: ['', '.vue']
  },
  plugins: [],
  devtool: "source-map"
}
