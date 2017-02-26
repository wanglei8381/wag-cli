import Vue from 'vue'
import './style.css'
import './style.styl'

/* eslint-disable no-unused-vars */
import Hello from 'components/Hello'
import Header from 'components/Header'

/* eslint-disable no-new */
new Vue({
  el: '#app',

  render (h) {
    return (
      <div class="container">
        <Header></Header>
        <Hello></Hello>
      </div>
    )
  }
})
