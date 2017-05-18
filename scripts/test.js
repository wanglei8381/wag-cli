process.env.NODE_ENV = 'test';
// let spawn = require('cross-spawn');
let crossEnv = require('cross-env');
let path = require('path');
let args = process.argv.slice(2);
if (!args.length) {
  args = ['--single-run']
}

crossEnv([
  'BABEL_ENV=test',
  'karma',
  'start',
  path.resolve(__dirname, '../config/karma.conf.js')
].concat(args))

// spawn.sync(
//   'karma',
//   ['start', path.resolve(__dirname, '../config/karma.conf.js')].concat(args),
//   { stdio: 'inherit', shell: true, env: { BABEL_ENV: 'test' } }
// );