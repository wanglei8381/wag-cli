import Vue from "vue";
import VueResource from "vue-resource";
import VueTouch from "vue-m-touch";
Vue.use(VueResource);
Vue.use(VueTouch);

new Vue({
	el: '.mod-result-container',
	components: {
	  'm-header': require('../../../components/header.vue')
	},
  methods: {
    addLink(){
      var modRecommend = document.querySelector('.mod-recommend');
      var lis = modRecommend.querySelectorAll('li');
      for (var i = 0; i < lis.length; i++) {
        var item = lis[i];
        item.addEventListener('click',function(e){
          var link = this.getAttribute ('data-link');
          location.href = link;
        })
      }      
    }
  },
  mounted() {
    //this.addLink()
  }
});