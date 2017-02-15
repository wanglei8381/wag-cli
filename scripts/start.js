const spawn = require('cross-spawn');
const path = require('path');

const result = spawn.sync(
  'node',
  [require.resolve('./test.js'), '-w', '-h'],
  {stdio: 'inherit'}
);

console.log(result)