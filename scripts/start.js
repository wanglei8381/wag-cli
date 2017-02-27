process.env.NODE_ENV = 'development';
const $path = require('path');
const express = require('express')
const proxyMiddleware = require('http-proxy-middleware')
let userConfig = require('../config/webpack.config.base').userConfig;
let serverConfig = require('../config/server.config');
let webpackConfig = require('../config/webpack.config.dev');

serverConfig = Object.assign({}, serverConfig, userConfig)

const app = express()
const compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})