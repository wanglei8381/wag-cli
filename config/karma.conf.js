var webpackConfig = require('./webpack.config.test')
var userConfig = require("./webpack.config.base").userConfig;

module.exports = function (config) {
  config.set({
    basePath: webpackConfig.context,
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'phantomjs-shim'],
    reporters: userConfig.coverage ? ['spec', 'coverage'] : ['spec'],
    files: ['./test/unit/index.js'],
    preprocessors: {
      './test/unit/index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './test/unit/coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text' },
        { type: 'text-summary' }
      ]
    }
  })
}
