<template>
  <div class="mod-header uf">
    <div class="part-left">
      <div class="go-back tap-active"></div>
    </div>
    <div class="part-center uf-f1 uf uf-center">五阿哥－我要找车</div>
    <div class="part-right"></div>
  </div>
</template>
<style lang="stylus" scoped rel="stylesheet/stylus">
  .uf2 {
    display: flex
  }
  .mod-header {
    background: #ffffff;
    height: 2.2rem;
    width: 18.75rem;
    margin: 0 auto;
    .part-left {
      width: 1.6rem;
      height: 100%;
      .go-back {
        display: block;
        width: 100%;
        height: 100%;
        background: url('//img.wuage.com/147911594168485go-back.png') no-repeat center center;
        background-size: 0.4rem;
      }
    }
    .part-center {
      line-height: 2.2rem;
      font-size: 0.9rem;
      color: #353535;
    }
    .part-right {
      width: 1.6rem;
    }
  }
</style>
<script>
  export default {
    methods: {
      back () {
        this.$emit('back')
      }
    }
  }
</script>
