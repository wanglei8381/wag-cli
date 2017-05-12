<template>
  <div>this is template body</div>
</template>
<script type="text/babel">
  import _ from 'lodash'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    methods: {
      onInput: _.debounce((e) => e.target.value, 200)
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
</style>
