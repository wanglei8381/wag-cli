import Vue from "vue";
import VueResource from "vue-resource";
import VueTouch from "vue-m-touch";
import header from "../../../components/header.vue";
import shareOrder from "./shareOrder.vue";
Vue.use(VueResource);
Vue.use(VueTouch);

new Vue({
  el: '.mod-result-container',

  data: {
    list: []
  },

  components: {
    'm-header': header,
    'share-order': shareOrder
  },

  methods: {
    back() {
      location.href = 'https://m.wuage.com/56';
    },

    goto(id) {
      location.href = 'https://m.wuage.com/product/detail?productId=' + id;
    },

    getRecommend() {
      this.$http.get('https://m.wuage.com/search/recommend-product', {
        params: {
          'postCategoryIds': categoryId,
          'page': 1,
          'pageSize': 2//下单成功
        }
      }).then((response) => {
        var res = response.data;
        this.list = res.data.wapProductDtos;
      });
    }
  },

  mounted() {
    this.getRecommend();
  }
});