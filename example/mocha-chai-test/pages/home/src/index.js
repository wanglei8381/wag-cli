import Vue from 'vue'
import Promise from 'es6-promise'
Promise.polyfill()

Vue.config.productionTip = false

import('./App').then((App) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render (h) {
      return <App></App>
    }
  })
})
