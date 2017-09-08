<template>
  <div>
    <input v-model="msg"/>
    <Hello></Hello>
    <p v-for="item in 10"
       v-if="item > 1">{{ msg }}</p>
  </div>
</template>
<script type="text/babel">
  import Hello from 'components/Hello.vue'
  import axios from 'axios'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },

    updated () {
      console.log('----->APP')
    },

    created () {
      axios.get('/api').then((res) => {
        console.log(res)
      })
    },

    components: {
      Hello
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
