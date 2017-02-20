var o = {
  "context": "/Users/wanglei/platform/workspace/wag-cli/my-app",
  "entry": {"/Users/wanglei/platform/workspace/wag-cli/my-app/pages/home/dist/index": "/Users/wanglei/platform/workspace/wag-cli/my-app/pages/home/src/index.js"},
  "output": {"publicPath": "/", "path": "/", "filename": "[name].js", "pathinfo": true},
  "resolve": {
    "extensions": [".js", ".json", ".vue"],
    "alias": {
      "vue$": "vue/dist/vue.common.js",
      "components": "/Users/wanglei/platform/workspace/wag-cli/my-app/components"
    }
  },
  "module": {
    "rules": [{
      "test": {},
      "enforce": "pre",
      "loader": "eslint-loader",
      "include": "/Users/wanglei/platform/workspace/wag-cli/my-app"
    }, {
      "test": {},
      "loader": "babel-loader",
      "include": "/Users/wanglei/platform/workspace/wag-cli/my-app",
      "options": {"cacheDirectory": true}
    }, {"test": {}, "loader": "file-loader", "options": {"name": "[name].[hash:8].[ext]"}}, {
      "test": {},
      "loader": "html-loader"
    }, {
      "exclude": [{}, {}, {}, {}, {}, {}],
      "loader": "url-loader",
      "options": {"limit": 10000, "name": "[name].[hash:8].[ext]"}
    }, {
      "test": {},
      "loader": "vue-loader",
      "include": "/Users/wanglei/platform/workspace/wag-cli/my-app",
      "options": {"cacheDirectory": true}
    }, {"test": {}, "use": ["style-loader", "css-loader"]}, {
      "test": {},
      "use": ["style-loader", "css-loader", "stylus-loader"]
    }]
  },
  "plugins": [{"definitions": {"process.env": {"NODE_ENV": "\"development\""}}}],
  "devtool": "cheap-module-source-map",
  "performance": {"hints": false},
  "watch": true
}