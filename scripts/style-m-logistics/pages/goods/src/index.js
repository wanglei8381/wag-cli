import Vue from "vue";
import VueTouch from "vue-m-touch";
import data from "./data";
Vue.use(VueTouch);
import '../../../components/dialog/toast';
new Vue({
    el: '.mod-action-container',
    data: {
        list: [],
        search: '',
        focus: false
    },
    components: {
        'index-bar': require('../../../components/index-bar')
    },
    methods: {
        chooseIndex(index){
            console.log('chooseIndex', index);
        }
    },
    mounted(){
        // setTimeout(()=>{
        this.list = data;
        // },1000);
    }
});