process.env.NODE_ENV = 'development';
const $path = require('path');
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
let userConfig = require('../config/webpack.config.base').userConfig;
let serverConfig = require('../config/server.config');
let webpackConfig = require('../config/webpack.config.start');
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

app.use(devMiddleware)

// 静态资源
let staticPath = serverConfig.staticPath
if (!staticPath) {
  staticPath = $path.dirname(serverConfig.index)
  console.log(staticPath)
  app.use(express.static(staticPath))
}

// proxy api requests
if (serverConfig.proxyTable) {
  Object.keys(serverConfig.proxyTable).forEach(function (context) {
    var options = proxyTable[context]
    if (typeof options === 'string') {
      options = {target: options}
    }
    app.use(proxyMiddleware(options.filter || context, options))
  })
}

app.listen(serverConfig.port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  if (serverConfig.autoOpenBrowser) {
    opn(url)
  }
})

