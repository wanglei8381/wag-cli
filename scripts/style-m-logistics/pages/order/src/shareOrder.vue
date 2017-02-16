<template>
  <div class="book-ok" v-if="show">
    <img @click="close" class="book-close" src="//img.wuage.com/Public/148698175412197132900_178_179.png" alt="关闭按钮">
    <img class="book-ok-img" src="//img.wuage.com/Public/148720965216907501677_750_1333.png" alt="晒单送话费">
  </div>
</template>
<style>
  .book-ok {
    position: fixed;
    padding-top: 1em;
    padding-left: 1em;
    padding-right: 1em;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 20px;
  }

  .book-ok .book-close {
    position: absolute;
    right: .7em;
    top: .7em;
    width: 1.5em;
    height: 1.5em;
  }

  .book-ok .book-ok-img {
    width: 100%;

  }

  @media (min-width: 375px) {
    .book-ok {
      font-size: 24px;
    }
  }

  @media (min-width: 414px) {
    .book-ok {
      font-size: 27px;
    }
  }

  @media (min-width: 415px) {
    .book-ok {
      font-size: 30px;
    }
  }
</style>
<script type="text/ecmascript-6">
  import preload from './preload'

  function isWeiXin () {
    var ua = window.navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == 'micromessenger'
  }

  export default{
    data() {
      return {
        show: false
      }
    },

    methods: {
      close() {
        this.show = false
      }
    },

    mounted() {

      if (isWeiXin()) {
        preload([
          '//img.wuage.com/Public/148720965216907501677_750_1333.png',
          '//img.wuage.com/Public/148698175412197132900_178_179.png'
        ], ()=> {
          this.show = true
        })
      } else {
        console.log('[result][shareOrder]请在微信端打开')
      }

    }
  }
</script>