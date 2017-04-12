import Vue from 'vue'
// import axios from 'axios'
import './style.css'
import './style.styl'

/* eslint-disable no-unused-vars */
import Hello from 'components/Hello'
import Header from 'components/Header'
import app from '@/app'

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
  },

  methods: {
    request () {
      // axios.get('/api').then((res) => {
      //   console.log(res)
      // })
    }
  },

  mounted () {
    this.request()
  }
})
