module.exports = {
  // 编译文件入口
  "files": {
    "pages/home/src/index.js": 1
  },

  /**  生产配置  **/
  // 是否提取css,默认不提取
  "extractCSS": true,
  // 是否生成source-map
  "devtool": "#source-map",

  /**  开发配置  **/
  // 入口文件
  "index": "pages/home/index.html",
  // 请求api
  "proxyTable": {}
}
