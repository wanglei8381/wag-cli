let pinyin = require('./pinyin');
let chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
module.exports = {
    template: require('./template.html'),
    data() {
        return {
            map: {},
            chars: chars
        }
    },
    props: {
        list: Array,
        search: String
    },
    computed: {
        data() {
            if (!this.search) {
                return this.map;
            }
            //搜索,支持汉字,拼音,拼音首字母
            // let search = pinyin.getFullCamelChars(this.search);
            let search = this.search;
            let map = {};
            let tmp = [];
            for (let key in this.map) {
                tmp = this.map[key].filter(function (item) {
                    return item.raw.indexOf(search) > -1 || item.camel.indexOf(search.toUpperCase()) > -1 || item.full.toUpperCase().indexOf(search.toUpperCase()) > -1;
                });
                if (tmp.length) {
                    map[key] = tmp;
                }
            }
            return map;
        },
        map() {
            //数据映射
            let map = {};
            chars.forEach((c) => {
                map[c] = [];
            });

            let arr = this.list.map(function (item) {
                return pinyin.getFullCamelChars(item);
            });
            arr.forEach((item) => {
                this.sort(map, item);
            });

            for (var key in map) {
                if (map[key].length == 0) {
                    delete map[key];
                }
            }

            return map;
        }
    },
    methods: {
        sort(map, item) {
            var initial = item.camel[0];
            var arr = map[initial];
            var len = arr.length;
            var i = len - 1;

            if (len === 0) {
                return arr.push(item);
            }

            if (item.full < arr[0].full) {
                return arr.unshift(item);
            }

            for (; i >= 0; i--) {
                if (arr[i].full <= item.full) {
                    arr.splice(i + 1, 0, item);
                    break;
                }
            }
        },
        chooseIndex(e) {
            var index = e.target.innerHTML;
            location.hash = index;
            this.$nextTick(function () {
                location.hash = '';
            });
        },
        chooseItem(e) {
            var raw = e.target.getAttribute('data-raw');
            this.$emit('click', raw);
        }
    }
};