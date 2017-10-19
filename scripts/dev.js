process.env.NODE_ENV = 'development';

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config.dev')

webpack(webpackConfig, function (err, stats) {
  if (err) {
    console.trace(err)
    return
  }
  // console.log('context', stats.compilation.options)
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

});

