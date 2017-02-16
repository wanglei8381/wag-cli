import Vue from "vue";
import VueResource from "vue-resource";
import VueTouch from "vue-m-touch";
import VueRegionPicker from "vue-m-region-picker";
import VuePicker from "vue-m-picker";
import '../../../components/dialog/model.js'
import '../../../components/dialog/toast.js'
Vue.use(VueResource);
Vue.use(VueTouch);

var baseUrl = '/logistics';
var categorys = [];
new Vue({
    el: '.mod-action-container',
    data: {
        from: '',
        to: '',
        carrier: '',
        weight: '',
        mobile: mobile,
        curIdxs: [0],
        categorys: [[], []],
        categoryId: '',
        showProtocol: false,
        fromForDisplay: '',
        toForDisplay: ''
    },
    components: {
        'm-header': require('../../../components/header.vue'),
        'm-region-picker': VueRegionPicker,
        'picker': VuePicker,
        'protocol': require('./protocol.vue')
    },
    computed: {
        isSubmit(){
            return this.from && this.to && this.carrier && this.weight && this.mobile
        }
    },
    methods: {
        confirmAddressFrom(province, city, area){
            this.from = province.name + '/' + city.name + '/' + area.name;
            if (province.name == '黑龙江省') {
                this.fromForDisplay = province.name.substring(0,3) + '/' + city.name + '/' + area.name;  
                return;             
            }
            this.fromForDisplay = province.name.substring(0,2) + '/' + city.name + '/' + area.name;            
        },
        confirmAddressTo(province, city, area){
            this.to = province.name + '/' + city.name + '/' + area.name;
            if (province.name == '黑龙江省') {
                this.toForDisplay = province.name.substring(0,3) + '/' + city.name + '/' + area.name; 
                return;              
            }   
            this.toForDisplay = province.name.substring(0,2) + '/' + city.name + '/' + area.name;         
        },
        confirmCategory(i, j){
            var pinMing = this.categorys[0][i];
            var pinLei = this.categorys[1][j];
            this.carrier = pinMing.name + '/' + pinLei.name;
            this.categoryId = pinLei.code;
        },
        handleWeight(e){
            var val = e.target.value.replace(/([^0-9.])/g, '');
            var isDecimal = val.indexOf('.') > -1;
            var vals = val.split('.');
            var decimal = vals[1];
            if (decimal) {//是否有小数
                decimal = '.' + decimal.substring(0, 3);
            } else {
                decimal = isDecimal ? '.' : '';
            }
            var joinVal = vals[0] + decimal;
            if (joinVal.indexOf('.') > -1) {
                this.weight = joinVal.substring(0, 14);
            } else {
                this.weight = joinVal.substring(0, 13);
            }
        },
        handleMobile(e){
            var val = e.target.value.replace(/[^0-9]/g, '');
            this.mobile = val.substring(0, 11);
        },
        resetWeight(){
            this.weight = ''
        },
        resetMobile(){
            this.mobile = ''
        },
        submit(){
            if (!this.isSubmit) return;
            if (this.mobile.length < 11) {
                wuage.openToast('请输入正确的手机号码')
                return;
            }
            this.checkuser();
        },
        checkuser(){
            //获取用户是否已授权
            this.$http.get(baseUrl + '/checkuser', {
                params: {
                    "openId": openId
                }
            }).then(function (res) {
                var data = (res.data);
                if (data.messageId === 'ok') {
                    //已授权
                    this.sendRequest();
                } else if (data.messageId == 4003) {
                    wuage.openModel({
                        content: '需要先登录',
                        showCancel: false,
                        confirmText: '确定',
                        confirm: function(){
                            location.href = loginUrl;
                        }
                    });
                } else {
                    //未授权>协议阅读
                    this.showProtocol = true
                }
            }, function () {
                wuage.openToast('网络异常，稍后再试')
            });
        },
        sendRequest(){
            //提交订单
            var arrFrom = this.from.split('/');
            var arrTo = this.to.split('/');
            var _this = this;
            this.$http.get(baseUrl + '/save.jsonp', {
                emulateJSON: true,
                params: {
                    "openId": openId,
                    "LogisticsOrder": JSON.stringify({
                        "order": {
                            "contactWay": _this.mobile
                        },
                        "goods": [
                            {
                                "categoryId": _this.categoryId,
                                "weight": _this.weight * 1000
                            }
                        ],
                        "address": [
                            {
                                "takeUnload": 1,
                                "province": arrFrom[0],
                                "city": arrFrom[1],
                                "area": arrFrom[2]
                            },
                            {
                                "takeUnload": 2,
                                "province": arrTo[0],
                                "city": arrTo[1],
                                "area": arrTo[2]
                            }
                        ]
                    }),
                    // '_csrf': $("meta[name='_csrf']").attr("content"),
                    // '_csrf_header': $("meta[name='_csrf_header']").attr("content")
                    '_csrf': document.querySelector('meta[name="_csrf"]').getAttribute('content'),
                    '_csrf_header': document.querySelector('meta[name="_csrf_header"]').getAttribute('content')
                }
            }).then(function (response) {
                var data = response.body
                if (data.messageId === 'ok') {
                    location.href = baseUrl + '/success?categoryId=' + _this.categoryId
                } else {
                    wuage.openModel({content: data.message,showCancel: false,confirmText: '退出'})
                }
            }, function () {
                wuage.openToast('网络异常，稍后再试')
            });
        },
        getCarriers(){
            //获取供应商
            this.$http.get(baseUrl + '/carriers', {
                params: {
                    'notcarriers': 1
                }
            }).then(function (response) {
                var data = response.body;
                var category = data.category;
                var first = [];
                category.forEach(function (item) {
                    if (item.fatherId == null) {
                        first.push(item)
                    } else {
                        categorys.push(item)
                    }
                });
                Vue.set(this.categorys, 0, first);

                this.setSubCategorys(first[0].id);

            }, function () {
                wuage.openToast('网络异常，稍后再试')
            })
        },
        changeCategory(i, j){
            if (i == 0) {
                this.setSubCategorys(this.categorys[0][j].id);
            }
        },
        setSubCategorys(fatherId){
            var arr = categorys.filter(function (item) {
                return item.fatherId == fatherId;
            });
            Vue.set(this.categorys, 1, arr);
        },
        agree(){
            //用户授权接口
            var _this = this;
            this.$http.get(baseUrl + '/useradd', {
                params: {
                    "openId": openId
                }
            }).then(function (res) {
                var data = res.data;
                if (data.messageId === 'ok') {
                    //授权成功
                    _this.showProtocol = false;
                    _this.sendRequest();
                } else {
                    //授权失败
                    wuage.openToast(data.message);
                }
            }, function () {
                wuage.openToast('网络异常，稍后再试')
            });
        }
    },
    mounted(){
        this.getCarriers()
    }
});