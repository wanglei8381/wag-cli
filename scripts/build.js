process.env.NODE_ENV = 'production';

const program = require('commander');
var ora = require('ora')
const webpack = require('webpack');
const chalk = require('chalk');
const fs = require('fs-extra');
const $path = require('path');
const dirname = process.cwd();

//定义参数,以及参数内容的描述
program
  .option('-r, --remove', 'build之前将dist目录删掉')
  .parse(process.argv);

let webpackConfig = require('../config/webpack.config.prod');
let commonsChunkPath = require('../config/webpack.config.base').commonsChunkPath;

const spinner = ora('[webpack:build] start...').start();

// 删除dist目录
if (program.remove) {
  fs.removeSync($path.join(dirname, commonsChunkPath))
}

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

