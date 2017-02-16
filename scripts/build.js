process.env.NODE_ENV = 'production';

const webpack = require('webpack');

let webpackConfig = {};

const args = process.argv.slice(2);
if (args.indexOf('-w') > -1) {
  console.log('[webpackConfig]development')
  webpackConfig = require('../config/webpack.client.dev').webpackConfig;
  webpackConfig.watch = true;
} else {
  console.log('[webpackConfig]production')
  webpackConfig = require('../config/webpack.client.prod').webpackConfig;
}

console.log(webpackConfig)

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

