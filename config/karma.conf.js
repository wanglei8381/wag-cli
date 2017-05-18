var webpackConfig = require('./webpack.config.test')

module.exports = function (config) {
  config.set({
    basePath: webpackConfig.context,
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai', 'phantomjs-shim'],
    reporters: ['spec', 'coverage'],
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
