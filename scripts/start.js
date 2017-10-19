process.env.NODE_ENV = 'development'
const $path = require('path')
const express = require('express')
const util = require('../util')
const proxyMiddleware = require('http-proxy-middleware')
let userConfig = require('../config/webpack.config.base').userConfig
let serverConfig = require('../config/server.config')
let webpackConfig = require('../config/webpack.config.start')
let opn = require('opn')
let webpack = require('webpack')

serverConfig = Object.assign({}, serverConfig, userConfig)

const app = express()
const compiler = webpack(webpackConfig)

let devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

const url = 'http://127.0.0.1:' + serverConfig.port
devMiddleware.waitUntilValid(function () {
  console.log(`> Listening at ${url}\n`)
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
if (serverConfig.proxyTable) {
  Object.keys(serverConfig.proxyTable).forEach(function (context) {
    var options = serverConfig.proxyTable[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}

// mock api requests
if (serverConfig.mockTable) {
  Object.keys(serverConfig.mockTable).forEach(function (context) {
    var options = serverConfig.mockTable[context]
    var mockFile = $path.resolve(webpackConfig.context, options)
    if (util.isFile(mockFile)) {
      app.use(context, require(mockFile))
    } else {
      console.log('[wag][start]mockTable:', context, options, '文件不存在')
    }
  })
}

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

app.use(devMiddleware)
app.use(hotMiddleware)

// 静态资源
app.use('/static', express.static('static'))
// 用户自定义的资源路径
let staticPath = serverConfig.staticPath
if (!staticPath) {
  staticPath = $path.join($path.dirname(serverConfig.index), 'assets')
  app.use('/assets', express.static(staticPath))
} else {
  app.use(express.static(staticPath))
}

console.log('[wag][start]staticPath:', 'static', staticPath)

app.listen(serverConfig.port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  if (serverConfig.autoOpenBrowser) {
    opn(url)
  }
})

