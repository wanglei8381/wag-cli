process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
let spawn = require('cross-spawn');
let path = require('path');
let args = process.argv.slice(2);
if (!args.length) {
  args = ['--single-run']
}
spawn.sync(
  'karma',
  ['start', path.resolve(__dirname, '../config/karma.conf.js')].concat(args),
  {stdio: 'inherit'}
);