module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'chai'],
    files: ['./src/index.js', './test/index.js'],
    singleRun: false,
    plugins: [
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher'
    ]
  })
}