<template>
  <div>
    this is template body
    <DateTime></DateTime>
  </div>
</template>
<script type="text/babel">
  import DateTime from 'vue-date-time/src/datepicker.vue'
  export default{
    data () {
      return {
        msg: 'hello vue'
      }
    },
    components: {
      DateTime
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~style-mui"
</style>
