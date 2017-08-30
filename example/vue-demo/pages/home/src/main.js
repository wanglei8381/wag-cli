import Vue from 'vue'
import './style.css'
import './style.styl'
// import './style.less'
// import './style.sass'
// import './style.scss'

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
