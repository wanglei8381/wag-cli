# wag-cli
基于webpack多页面打包工具，主要针对vue,react项目，支持css和stylus，暂时不支持less和sass/scss

## Install

npm install -g wag-cli

## Usage
wag [options] [value ...]

```
wag init projectName [--cover] [--react]
初始化一个项目，如果项目已经存在，可以添加--cover参数将其覆盖, 默认生成vue项目，使用--react参数生成react项目

项目目录
|-components 通用组件
|-pages 项目模块
    |-home 其中一个模块，模块必须有一个src目录
        |-src
|-test 测试
    |-unit 单元测试
|-wag.config.js/webpack.config.js wag配置文件


wag dev
在本地会持续编译并生成对应的文件，主要在联调时供后端人员访问
wag start
在本地会持续编译并打开浏览器，实现热加载和代理
wag build
上线发布
wag test [参数同karma]
测试框架karma+mocha+chai
```

```javascript
// wag.config.js配置文件详情
module.exports = {
 // 编译文件入口
 "files": {
   "pages/home/src/index.js": 1
 },

 /**  生产配置  **/
 // 提取js模块
 "vendor": [
   "vue",
   "axios"
 ],
 // 生成文件的hash值,默认不生成
 "chunkhash": 8,
 // 是否提取css,默认不提取
 "extractCSS": true,
 // 是否生成source-map, 默认不生成
 "devtool": "#source-map",
 // 线上访问地址，默认//static.wuage.com/项目目录
 "publicPath": "/",

 /**  开发配置  **/
 // 上下文,默认当前目录
 "context": __dirname,
 // 入口文件
 "index": "pages/home/index.html",
 // 静态资源目录,默认index的上级目录
 "staticPath": "./",
 // 端口默认8080
 "port": 8080,
 // 自动打开浏览器
 "autoOpenBrowser": true,
 // api
 "proxyTable": {
   '/api': {
     target: 'http://127.0.0.1:3000',
     changeOrigin: true
   }
 }
} 
```


## Commands

    init [projectName]  初始化项目
    dev                 开发
    build               发布上线
    start               开发自动启动服务
    test [参数同karma]   测试
    help [cmd]          display help for [cmd]

## Options

    -h, --help     output usage information
    -V, --version  output the version number
    -c, --cover    如果工程名存在,就覆盖掉
    -r, --remove   build之前将dist目录删掉

