#!/usr/bin/env node
const path = require('path');
const spawn = require('cross-spawn');
const program = require('commander');
const package = require('../package.json');
const chalk = require('chalk');
let script;

//定义参数,以及参数内容的描述
program
  .version(package.version)
  .arguments('<script>')
  .action(function (name) {
    script = name;
  })
  .usage('[options] [value ...]')
  .command('init [projectName]', '初始化项目')
  .option('-c, --cover', '如果工程名存在,就覆盖掉')
  .command('dev', '开发')
  .command('build', '发布上线')
  .option('-r, --remove', 'build之前将dist目录删掉')
  .command('start', '开发自动启动服务')
  .command('test', '测试')
  .on('--help', function () {
    console.log();
  })
  .parse(process.argv);

const args = process.argv.slice(3);

switch (script) {
  case 'init':
  case 'dev':
  case 'build':
  case 'start':
  case 'test':
    const result = spawn.sync(
      'node',
      [require.resolve(path.join('../scripts', script))].concat(args),
      {stdio: 'inherit'}
    );
    process.exit(result.status);
    break;
  default:
    console.log(chalk.bold.red(`Unknown script "${script}".`));
    console.log('Run wag --help to see all options.\n');
    break;
}