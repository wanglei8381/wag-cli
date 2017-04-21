/* eslint-disable */
// CMD
function cmd () {
  require.ensure([], function (require) {
    console.log('======= index1 =======')
    let a = require('./a')
    console.log('======= index2 =======')
    console.log(a.name)
  })
}

// AMD
function amd () {
  require(['./b'], function (b) {
    console.log('======= index3 =======')
    console.log('======= index4 =======')
    console.log(b.name)
  })
}

// CMD
let a = require('./a')
function cmdlazy () {
  // C的代码下载下来了，但不会执行，知道在回调中使用require('./c')才会调用
  // require中的模块会打包成一起
  require.ensure(['./c'], function (require) {
    console.log('======= index5 =======')
    console.log('======= index6 =======')
    console.log(a.name)
  })
}

setTimeout(() => {
  cmd()
}, 0)

setTimeout(() => {
  amd()
}, 5000)

setTimeout(() => {
  cmdlazy()
}, 10000)

import('./a')
