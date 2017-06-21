import Vue from 'vue'

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
