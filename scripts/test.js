process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
const spawn = require('cross-spawn');
const path = require('path');
spawn.sync(
  'karma',
  ['start', path.resolve(__dirname, '../config/karma.conf.js'), '--single-run'],
  {stdio: 'inherit'}
);