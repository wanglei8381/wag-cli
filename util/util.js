var fs = require('fs');
var $path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

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

exports.stlyeRules = function stlyeRules (sourceMap, extract) {
  var types = [
    { test: /\.css$/, loader: 'css' },
    { test: /\.styl$/, loader: 'stylus' },
    { test: /\.less/, loader: 'less' },
    { test: /\.s[ac]ss$/, loader: 'sass' }]
  var options = { sourceMap: !!sourceMap }
  var use = [
    {
      loader: 'css-loader',
      options: options
    },
    {
      loader: 'postcss-loader',
      options: options
    }
  ]

  if (!extract) {
    use.unshift({
      loader: 'style-loader',
      options: options
    })
  }

  return types.map((t) => {
    var tuse = t.loader === 'css' ? use : use.concat({
      loader: t.loader + '-loader',
      options: options
    })

    return extract ? {
      test: t.test,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: tuse
      })
    } : {
      test: t.test,
      use: tuse
    }
  })
}

exports.extractVueStlye = function extractVueStlye () {
  return {
    css: ExtractTextPlugin.extract({
      use: 'css-loader',
      fallback: 'vue-style-loader'
    }),
    stylus: ExtractTextPlugin.extract({
      fallback: "vue-style-loader",
      use: ['css-loader', 'stylus-loader']
    }),
    less: ExtractTextPlugin.extract({
      fallback: "vue-style-loader",
      use: ['css-loader', 'less-loader']
    }),
    sass: ExtractTextPlugin.extract({
      fallback: "vue-style-loader",
      use: ['css-loader', 'sass-loader']
    }),
    scss: ExtractTextPlugin.extract({
      fallback: "vue-style-loader",
      use: ['css-loader', 'sass-loader']
    })
  }
}