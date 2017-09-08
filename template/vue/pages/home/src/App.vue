<template>
  <Hello></Hello>
</template>
<script type="text/babel">
  import Hello from 'components/Hello.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      Hello
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
