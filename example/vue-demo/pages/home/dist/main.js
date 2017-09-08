/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!********************************!*\
  !*** ./pages/home/src/main.js ***!
  \********************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

throw new Error("Module build failed: TypeError: Cannot read property 'recommended' of undefined\nReferenced from: /Users/wanglei/platform/workspace/wag-cli/example/vue-demo/.eslintrc.json\n    at loadConfigFile (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config/config-file.js:217:40)\n    at load (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config/config-file.js:535:18)\n    at configExtends.reduceRight (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config/config-file.js:424:36)\n    at Array.reduceRight (native)\n    at applyExtends (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config/config-file.js:408:28)\n    at Object.load (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config/config-file.js:566:22)\n    at loadConfig (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config.js:63:33)\n    at getLocalConfig (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config.js:130:29)\n    at Config.getConfig (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/config.js:260:26)\n    at processText (/Users/wanglei/platform/workspace/wag-cli/node_modules/eslint/lib/cli-engine.js:224:33)");

/***/ })
/******/ ]);
//# sourceMappingURL=main.js.map