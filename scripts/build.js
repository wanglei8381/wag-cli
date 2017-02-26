process.env.NODE_ENV = 'production';

var ora = require('ora')
const webpack = require('webpack');
const chalk = require('chalk');

let webpackConfig = require('../config/webpack.config.prod');

const spinner = ora('[webpack:build] start...').start();

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

  console.log(chalk.cyan('[webpack:build] complete\n'))
});

