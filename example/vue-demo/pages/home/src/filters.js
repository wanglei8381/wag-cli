import Vue from 'vue'
import moment from 'moment'

Vue.filter('format', function (val) {
  return moment(val).format('YYYY-MM-DD hh:mm:ss')
})
