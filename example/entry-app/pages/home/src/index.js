require.ensure([], function (require) {
  let a = require('./a')
  console.log(a.name)
})

console.log('======= index =======')
