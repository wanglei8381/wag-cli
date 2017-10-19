import Vue from 'vue'
/* eslint-disable no-unused-vars */
import App from './App'
import './style.css'
import './style.styl'
// import './style.less'
// import './style.sass'
// import './style.scss'

Vue.config.productionTip = false

/* eslint-disable no-unused-vars */
const Toast = {
  render (h) {
    return <h1>OK2</h1>
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render (h) {
    return (
      <div>
        <Toast/>
        <App></App>
      </div>
    )
  }
})
