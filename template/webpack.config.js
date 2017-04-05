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
  // 是否生成source-map
  "devtool": "#source-map",
  // 线上访问地址
  "publicPath": "/",

  /**  开发配置  **/
  // 上下文,默认当前目录
  "context": '/',
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