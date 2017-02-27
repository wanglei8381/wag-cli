#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const $path = require('path');
const fs = require('fs-extra');
const util = require('../util/util');
const version = require('../package.json').version;

let projectName;
//定义参数,以及参数内容的描述
program
  .arguments('<project-directory>')
  .option('-c, --cover', '如果工程名存在,就覆盖掉')
  .action(function (name) {
    projectName = name;
  })
  .parse(process.argv);

if (typeof projectName === 'undefined') {
  console.error(chalk.bold.red('Please specify the project directory:'));
  console.log('Run wag --help to see all options.\n');
  process.exit(1);
  process.cwd();
}

let root = $path.resolve(projectName)

//判断目录
if (util.exists(root) && !program.cover) {
  console.error(chalk.bold.red('The project directory has existed'));
  console.log();
  process.exit(1);
}

createApp(root, projectName)

function createApp (root, appName) {

  const packageJson = {
    name: appName,
    description: "",
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'wag dev',
      start: 'wag start',
      build: 'wag build',
      test: 'wag test'
    },
    dependencies: {
      vue: "^2.1.10"
    },
    devDependencies: {
      "wag-cli": version
    }
  }

  //创建目录
  if (!util.exists(root)) {
    fs.mkdirSync(root);
  }

  fs.copySync($path.resolve(__dirname, '../template'), root);

  //创建package
  fs.writeFileSync(
    $path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  console.log();
  console.log('Success! Created ' + appName + ' at ' + root);
  console.log();
}


