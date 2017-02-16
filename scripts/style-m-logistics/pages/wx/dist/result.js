webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(2);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _vueMTouch = __webpack_require__(3);
	
	var _vueMTouch2 = _interopRequireDefault(_vueMTouch);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueResource2.default);
	_vue2.default.use(_vueMTouch2.default);
	
	new _vue2.default({
	  el: '.mod-result-container',
	  components: {
	    'm-header': __webpack_require__(7)
	  },
	  methods: {
	    addLink: function addLink() {
	      var modRecommend = document.querySelector('.mod-recommend');
	      var lis = modRecommend.querySelectorAll('li');
	      for (var i = 0; i < lis.length; i++) {
	        var item = lis[i];
	        item.addEventListener('click', function (e) {
	          var link = this.getAttribute('data-link');
	          location.href = link;
	        });
	      }
	    }
	  },
	  mounted: function mounted() {
	    //this.addLink()
	  }
	});

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Touch = __webpack_require__(4);
	
	var app = module.exports = {};
	app.install = function (Vue, options) {
	
	    options = options || {};
	    var longTapTime = options.longTapTime || 350;
	
	    Vue.directive('touch', {
	        bind: function (el, binding, vnode) {
	            var touch = el.touch = new Touch(el);
	            var longTapTimeout = null;
	            var handler = function (res) {
	                var e = res.e;
	                if (typeof binding.value === 'function') {
	                    var _handler = function () {
	                        if (binding.modifiers.self) {
	                            if (e.target === e.currentTarget) {
	                                binding.value(e);
	                            }
	                        } else {
	                            binding.value(e);
	                        }
	                    }
	
	                    switch (binding.arg) {
	                        case 'tap':
	                            if (Math.abs(res.x1 - res.x2) < 30 && Math.abs(res.y1 - res.y2) < 30) {
	                                _handler();
	                            }
	                            break;
	                        case 'longtap':
	                            _handler();
	                            break;
	                    }
	                }
	            };
	
	            var modify = function (e) {
	                if (binding.modifiers.stop) {
	                    e.stopPropagation();
	                }
	                if (binding.modifiers.prevent) {
	                    e.preventDefault();
	                }
	            }
	
	            touch.on('touch:start', function (res) {
	                modify(res.e);
	                longTapTimeout = setTimeout(function () {
	                    handler(res);
	                }, longTapTime);
	            });
	
	            touch.on('touch:move', function () {
	                clearTimeout(longTapTimeout);
	            });
	
	            touch.on('touch:end', function (res) {
	                clearTimeout(longTapTimeout);
	                modify(res.e);
	                handler(res);
	            });
	
	            touch.start();
	        },
	        unbind: function (el) {
	            //删除dom监听事件
	            el.touch._remove();
	            el.touch = null;
	        }
	    });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//触摸事件处理
	var Event = __webpack_require__(5);
	var domEventHelper = __webpack_require__(6);
	
	function Touch(el) {
	    Event.call(this);
	    this.el = el || document;
	    this.touch = null;
	    this.lastTimestamp = Date.now();
	    this.spend = 0;
	    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
	}
	
	Touch.prototype = Object.create(Event.prototype, {
	    'constructor': {
	        value: Touch
	    }
	});
	
	Touch.prototype._add = function () {
	    domEventHelper.add(this.el, 'touchstart', this.touchStart.bind(this), false);
	    domEventHelper.add(this.el, 'touchmove', this.touchMove.bind(this), false);
	    domEventHelper.add(this.el, 'touchend', this.touchEnd.bind(this), false);
	    domEventHelper.add(this.el, 'touchcancel', this.touchCancel.bind(this), false);
	};
	
	Touch.prototype._remove = function () {
	    domEventHelper.remove(this.el, 'touchstart');
	    domEventHelper.remove(this.el, 'touchmove');
	    domEventHelper.remove(this.el, 'touchend');
	    domEventHelper.remove(this.el, 'touchcancel');
	};
	
	Touch.prototype.touchStart = function (e) {
	    this.lastTimestamp = Date.now();
	    var touch = e.touches[0];
	    this.touch = touch;
	    this.touch.el = 'tagName' in touch.target ?
	        touch.target : touch.target.parentNode;
	
	    this.x2 = this.x1 = touch.pageX;
	    this.y2 = this.y1 = touch.pageY;
	    this.trigger('touch:start', {
	        x1: this.x1,
	        y1: this.y1,
	        e: e,
	        el: this.touch.el,
	        timestamp: this.lastTimestamp
	    });
	};
	
	Touch.prototype.touchMove = function (e) {
	    this.spend = Date.now() - this.lastTimestamp;
	    var touch = e.touches[0];
	    var yrange = 0;
	    var xrange = 0;
	    if (this.y2) {
	        yrange = this.y2 - touch.pageY;
	        xrange = this.x2 - touch.pageX;
	    }
	
	    this.x2 = touch.pageX;
	    this.y2 = touch.pageY;
	
	    this.trigger('touch:move', {
	        x1: this.x1,
	        y1: this.y1,
	        x2: this.x2,
	        y2: this.y2,
	        e: e,
	        toUp: yrange > 0,
	        toLeft: xrange > 0,
	        xrange: xrange,
	        yrange: yrange,
	        spend: this.spend
	    });
	};
	
	Touch.prototype.touchEnd = function (e) {
	    this.spend = Date.now() - this.lastTimestamp;
	    this.trigger('touch:end', {
	        x1: this.x1,
	        y1: this.y1,
	        x2: this.x2,
	        y2: this.y2,
	        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
	        e: e,
	        spend: this.spend
	    });
	};
	
	Touch.prototype.touchCancel = function () {
	    //this.pause('touch:start touch:move touch:end');
	    this.trigger('touch:cancel', {
	        x1: this.x1,
	        y1: this.y1,
	        x2: this.x2,
	        y2: this.y2,
	        dir: swipeDirection(this.x1, this.x2, this.y1, this.y2),
	        spend: this.spend
	    });
	    this.spend = 0;
	    this.touch = null;
	    this.x1 = this.y1 = this.x2 = this.y2 = undefined;
	};
	
	Touch.prototype.start = function () {
	    this._add();
	    var _this = this;
	    window.addEventListener('scroll', function (e) {
	        // this.touchCancel();
	        _this.trigger('scroll', e);
	    }, false);
	
	    //重新绑定dom
	    this.on('touch:el', function (e) {
	        _this._remove();
	        _this.el = el;
	        _this._add();
	    });
	};
	
	function swipeDirection(x1, x2, y1, y2) {
	    return Math.abs(x1 - x2) >=
	    Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'left' : 'right') : (y1 - y2 > 0 ? 'up' : 'down')
	}
	
	module.exports = Touch;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	
	    /**
	     * Event事件对象
	     * cxt上下文
	     * @constructor
	     */
	    function Event(cxt) {
	        this._events = {};
	        this.cxt = cxt;
	    }
	
	    //off,pause,resume通用方法
	    function eventsApi(self, name, cb, cxt) {
	        var events = {};
	
	        for (var key in self._events) {
	            events[key] = self._events[key];
	        }
	
	        if (name) {
	            events = {};
	            name.split(/\s/).forEach(function (ename) {
	                if (ename && self._events[ename]) {
	                    events[ename] = self._events[ename];
	                }
	            });
	        }
	
	        var keys = Object.keys(events);
	        if (keys.length === 0) return this;
	
	        if (cb && typeof cb === 'function') {
	            keys.forEach(function (key) {
	                events[key] = events[key].filter(function (event) {
	                    return event.cb == cb;
	                });
	            });
	        }
	
	        if (cxt) {
	            keys.forEach(function (key) {
	                events[key] = events[key].filter(function (event) {
	                    return event.cxt == cxt;
	                });
	            });
	        }
	
	        return events;
	    }
	
	    //暂停,恢复通用方法
	    function eventsPauseApi(self, name, cb, cxt, val) {
	        var events = eventsApi(self, name, cb, cxt);
	        for (var key in events) {
	            events[key].forEach(function (item) {
	                item.pause = val;
	            });
	        }
	    }
	
	    //on,once通用方法
	    function eventsOnApi(self, name, cb, cxt, once) {
	        if (!name || typeof cb != 'function' || typeof name !== 'string') return this;
	        name.split(/\s/).forEach(function (ename) {
	            if (!ename) return;
	            var handlers = self._events[ename] || [];
	            handlers.push({
	                cb: cb,
	                cxt: cxt || self.cxt || self,
	                pause: false,
	                i: 0,
	                once: once
	            });
	            self._events[ename] = handlers;
	        });
	    }
	
	    /**
	     * 绑定一个事件
	     * @param name 只能是字符串
	     * @param cb
	     * @param cxt
	     * @returns {Event}
	     */
	    Event.prototype.on = function (name, cb, cxt) {
	        eventsOnApi(this, name, cb, cxt, false);
	        return this;
	    };
	
	    Event.prototype.once = function (name, cb, cxt) {
	        eventsOnApi(this, name, cb, cxt, true);
	        return this;
	    };
	
	    /**
	     * 卸载某个事件
	     * @param name
	     * @returns {Event}
	     */
	    Event.prototype.off = function (name, cb, cxt) {
	
	        var events = eventsApi(this, name, cb, cxt);
	        for (var key in events) {
	            var e = this._events[key];
	            events[key].slice(0).forEach(function (item) {
	                e.splice(e.indexOf(item), 1);
	            });
	        }
	
	        return this;
	    }
	
	    /**
	     * 暂停某个事件,用法同off
	     * @param name
	     * @returns {Event}
	     */
	    Event.prototype.pause = function (name, cb, cxt) {
	        eventsPauseApi(this, name, cb, cxt, true);
	        return this;
	    };
	
	    /**
	     * 恢复某个事件,用法同off
	     * @param name
	     * @returns {Event}
	     */
	    Event.prototype.resume = function (name, cb, cxt) {
	        eventsPauseApi(this, name, cb, cxt, false);
	        return this;
	    };
	
	    /**
	     * 触发某个事件
	     * @param name
	     * @returns {Event}
	     */
	    Event.prototype.trigger = function (name) {
	
	        var self = this;
	        if (!name || typeof name !== 'string') return this;
	        var len = arguments.length;
	        var args = [], i = 1;
	        while (i < len) {
	            args.push(arguments[i++]);
	        }
	
	        name.split(/\s/).forEach(function (ename) {
	            if (ename && self._events[ename]) {
	                self._events[ename].forEach(function (handle) {
	                    if (!handle.pause && !(handle.i === 1 && handle.once)) {
	                        handle.cb.apply(handle.cxt, args);
	                        handle.i++;
	                    }
	                });
	            }
	        });
	
	        return this;
	    };
	
	    if (true) {
	        if (typeof module !== 'undefined' && module.exports) {
	            exports = module.exports = Event;
	        }
	        exports.Event = Event;
	    } else {
	        window.Event = Event;
	    }
	
	})();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	
	    var stack = {};
	    var i = 1;
	    var helper = {};
	
	    helper.add = function (el, event, cb, useCapture) {
	        el._uid = el._uid || i++;
	        var obj = stack[el._uid] = stack[el._uid] ? stack[el._uid] : {};
	        var arr = obj[event] = obj[event] ? obj[event] : [];
	        arr.push(cb);
	        el.addEventListener(event, cb, !!useCapture);
	    };
	
	    helper.remove = function (el, event, cb) {
	        if (typeof cb === 'function' && cb.name) {
	            el.removeEventListener(event, cb);
	        } else if (el._uid && stack[el._uid]) {
	            var obj = stack[el._uid];
	            var keys = [];
	            if (event) {
	                if (obj[event]) {
	                    keys.push(event);
	                }
	            } else {
	                keys = Object.keys(obj);
	            }
	
	            keys.forEach(function (key) {
	                obj[key].forEach(function (_cb) {
	                    el.removeEventListener(event, _cb);
	                });
	                delete obj[key];
	            });
	
	        }
	    };
	
	    //引入Node中
	    Node.prototype.addEvent = function (event, cb, useCapture) {
	        helper.add(this, event, cb, useCapture);
	        return this;
	    }
	
	    Node.prototype.removeEvent = function (event, cb) {
	        helper.remove(this, event, cb);
	        return this;
	    }
	
	    if (true) {
	        if (typeof module !== 'undefined' && module.exports) {
	            exports = module.exports = helper;
	        }
	        exports.domEventHelper = helper;
	    } else {
	        window.domEventHelper = helper;
	    }
	
	})();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__webpack_require__(8)
	__vue_template__ = __webpack_require__(12)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-1c072fbe/header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(11)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/.0.23.1@css-loader/index.js?sourceMap!./../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js?id=_v-1c072fbe&scoped=true!./../node_modules/.2.3.1@stylus-loader/index.js!./../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./header.vue", function() {
				var newContent = require("!!./../node_modules/.0.23.1@css-loader/index.js?sourceMap!./../node_modules/.8.5.4@vue-loader/lib/style-rewriter.js?id=_v-1c072fbe&scoped=true!./../node_modules/.2.3.1@stylus-loader/index.js!./../node_modules/.8.5.4@vue-loader/lib/selector.js?type=style&index=0!./header.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports
	
	
	// module
	exports.push([module.id, ".mod-header[_v-1c072fbe] {\n  background: #fff;\n  height: 2.2rem;\n  width: 18.75rem;\n  margin: 0 auto;\n}\n.mod-header .part-left[_v-1c072fbe] {\n  width: 1.6rem;\n  height: 100%;\n}\n.mod-header .part-left .go-back[_v-1c072fbe] {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: url(\"//img.wuage.com/147911594168485go-back.png\") no-repeat center center;\n  background-size: 0.4rem;\n}\n.mod-header .part-center[_v-1c072fbe] {\n  line-height: 2.2rem;\n  font-size: 0.9rem;\n  color: #353535;\n}\n.mod-header .part-right[_v-1c072fbe] {\n  width: 1.6rem;\n}\n", "", {"version":3,"sources":["/./components/components/header.vue","/./components/header.vue"],"names":[],"mappings":"AAUA;EACC,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,eAAA;CCTA;ADaA;EACC,cAAA;EACA,aAAA;CCXD;ADYC;EACC,eAAA;EACA,YAAA;EACA,aAAA;EACA,sFAAA;EACA,wBAAA;CCVF;ADaA;EAGC,oBAAA;EACA,kBAAA;EACA,eAAA;CCbD;ADeA;EACC,cAAA;CCbD","file":"header.vue","sourcesContent":["\n\n\n\n\n\n\n\n\n\n.mod-header{\n\tbackground: #fff;\n\theight: 2.2rem;\n\twidth: 18.75rem;\n\tmargin: 0 auto;\n\t// display: flex;\n\t// flex-direction: row;\n\t// flex-wrap: nowrap;\n\t.part-left{\n\t\twidth: 1.6rem;\n\t\theight: 100%;\n\t\t.go-back{\n\t\t\tdisplay: block;\n\t\t\twidth: 100%;\n\t\t\theight: 100%;\n\t\t\tbackground: url('//img.wuage.com/147911594168485go-back.png') no-repeat center center;\n\t\t\tbackground-size: 0.4rem;\t\t\n\t\t}\n\t}\n\t.part-center{\n\t\t// flex: 1;\n\t\t// text-align: center;\n\t\tline-height: 2.2rem;\n\t\tfont-size: 0.9rem;\n\t\tcolor: #353535;\n\t}\n\t.part-right{\n\t\twidth: 1.6rem;\n\t}\n}\n",".mod-header {\n  background: #fff;\n  height: 2.2rem;\n  width: 18.75rem;\n  margin: 0 auto;\n}\n.mod-header .part-left {\n  width: 1.6rem;\n  height: 100%;\n}\n.mod-header .part-left .go-back {\n  display: block;\n  width: 100%;\n  height: 100%;\n  background: url(\"//img.wuage.com/147911594168485go-back.png\") no-repeat center center;\n  background-size: 0.4rem;\n}\n.mod-header .part-center {\n  line-height: 2.2rem;\n  font-size: 0.9rem;\n  color: #353535;\n}\n.mod-header .part-right {\n  width: 1.6rem;\n}\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "\n<div class=\"mod-header uf\" _v-1c072fbe=\"\">\n\t<div class=\"part-left\" _v-1c072fbe=\"\">\n\t\t<div class=\"go-back tap-active\" _v-1c072fbe=\"\"></div>\n\t</div>\n\t<div class=\"part-center uf uf-f1 uf-center\" _v-1c072fbe=\"\">五阿哥－我要找车</div>\n\t<div class=\"part-right\" _v-1c072fbe=\"\"></div>\n</div>\t\n";

/***/ }
]);
//# sourceMappingURL=result.js.map