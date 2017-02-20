var fs = require('fs');
var $path = require('path');

//文件或目录是否存在
var exists = exports.exists = function (path) {
    return fs.existsSync(path);
}

//是否是文件
exports.isFile = function (path) {
    return exists(path) && fs.statSync(path).isFile();
}

//是否是目录
exports.isDir = function (path) {
    return exists(path) && fs.statSync(path).isDirectory();
}

