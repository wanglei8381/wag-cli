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
  .command('dev', '开发')
  .command('build', '发布上线')
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
  case 'test:watch':
    const result = spawn.sync(
      'node',
      [require.resolve(path.join('../scripts', script))].concat(args),
      {stdio: 'inherit'}
    );
    process.exit(result.status);
    break;
  default:
    console.log(`Unknown script "${script}".`);
    break;
}