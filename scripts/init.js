const program = require('commander')
const chalk = require('chalk')
const _ = require('lodash')
const $path = require('path')
const fs = require('fs-extra')
const util = require('../util')
const packageConfig = require('../package.json')

let projectName
//定义参数,以及参数内容的描述
program
  .arguments('<project-directory>')
  .option('-c, --cover', '如果工程名存在,就覆盖掉')
  .action(function (name) {
    projectName = name
  })
  .option('--react', '生成react项目')
  .parse(process.argv)

if (typeof projectName === 'undefined') {
  console.error(chalk.bold.red('Please specify the project directory:'))
  console.log('Run wag --help to see all options.\n')
  process.exit(1)
}

let root = $path.resolve(projectName)

//判断目录
if (util.exists(root) && !program.cover) {
  console.error(chalk.bold.red('The project directory has existed') + '\n')
  process.exit(1)
}

createApp(root, projectName, program.react)

function createApp (root, appName, isReact) {
  const packageJson = {
    name: appName,
    description: "A new project",
    version: '1.0.0',
    private: true,
    scripts: {
      dev: 'wag dev',
      start: 'wag start',
      build: 'wag build --remove',
      test: 'wag test'
    },
    devDependencies: {
      "wag-cli": packageConfig.version
    }
  }

  //创建目录
  if (!util.exists(root)) {
    fs.mkdirSync(root)
  }

  let templatePath = '../template/'
  if (isReact) {
    packageJson.dependencies = _.pick(packageConfig.devDependencies, ['react', 'react-dom', 'prop-types'])
    templatePath += 'react'
  } else {
    packageJson.dependencies = _.pick(packageConfig.devDependencies, ['vue', 'vue-template-compiler'])
    templatePath += 'vue'
  }

  fs.copySync($path.resolve(__dirname, templatePath), root)

  //创建package
  fs.writeFileSync(
    $path.join(root, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  )

  //不知道为什么在npm发布项目时，会把.gitignore文件名改成.npmignore
  //手动改过来
  if (fs.existsSync($path.join(root, '.npmignore'))) {
    fs.renameSync($path.join(root, '.npmignore'), $path.join(root, '.gitignore'))
  }

  console.log()
  console.log('Success! Created ' + appName + ' at ' + root)
  console.log()
}


