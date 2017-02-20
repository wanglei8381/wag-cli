process.env.NODE_ENV = 'development';

const webpack = require('webpack');
let webpackConfig = require('../config/webpack.config.dev');

webpack(webpackConfig, function (err, stats) {
  if (err)
    return console.log(err);

  var jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0)
    console.log(jsonStats.errors);
  if (jsonStats.warnings.length > 0)
    console.log(jsonStats.warnings);

  console.log(stats.toString({
    chunks: false,
    colors: true
  }));
  console.log('[webpack:build] complete');
});

