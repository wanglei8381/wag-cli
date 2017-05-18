<template>
  <div>
    <input v-model="msg"/>
    <Hello></Hello>
    <p>{{ msg }}</p>
  </div>
</template>
<script type="text/babel">
  import Hello from 'components/Hello.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },

    updated () {
      console.log('----->APP')
    },

    components: {
      Hello
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
