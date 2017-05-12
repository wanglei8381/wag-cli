import Vue from 'vue'
import _ from 'lodash'

Vue._ = _
Vue.config.productionTip = false

import(/* webpackChunkName: "app" */'./App').then((App) => {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    render (h) {
      return <App></App>
    }
  })
})
