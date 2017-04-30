<template>
  <div :class="$style.hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<style module>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  .big-word {
    font-size: 30px;
  }

  .word-bg {
    background-color: #dd5555;
  }

  .hello {
    composes: big-word;
    composes: word-bg;
    color: #00a000;
  }

  :global(.container) {
    width: 800px;
    margin: auto;
  }

</style>
