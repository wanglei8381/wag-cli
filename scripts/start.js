const $path = require('path');

console.log(__dirname)

console.log($path.resolve(__dirname, '../dist', $path.basename(__dirname)))