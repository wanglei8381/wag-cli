import Vue from 'vue'

Vue.config.productionTip = false

// 测试用例
const testsContext = require.context('./specs', true, /\.spec$/)
testsContext.keys().forEach(testsContext)

// 源代码
require('pages/home/src/App.vue')
