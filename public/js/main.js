"use strict";var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(t){function e(o){if(n[o])return n[o].exports;var s=n[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,o){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"===(void 0===t?"undefined":_typeof(t))&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var s in t)e.d(o,s,function(e){return t[e]}.bind(null,s));return o},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=0)}({"./src/js/app.js":function srcJsAppJs(module,__webpack_exports__,__webpack_require__){eval('__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _blocksApi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocksApi.js */ "./src/js/blocksApi.js");\n\n\nconst api = new _blocksApi_js__WEBPACK_IMPORTED_MODULE_0__["default"];\n\n\n//# sourceURL=webpack:///./src/js/app.js?')},"./src/js/blocksApi.js":function srcJsBlocksApiJs(module,__webpack_exports__,__webpack_require__){eval("__webpack_require__.r(__webpack_exports__);\n/*\n * Blocks API\n * Sends data to express app to write JSON data that builds page.\n */\nclass BlocksApi {\n\tconstructor () {\n\t\tthis.endpoint = 'http://localhost:4000/blocks';\n\t\tthis.button = document.getElementById('addBlock');\n\n\t\tthis.bindEventListeners();\n\t}\n\n\tbindEventListeners() {\n\t\tthis.button.addEventListener('click', () => {\n\t\t\tthis.postBlock();\n\t\t});\n\t}\n\n\tpostBlock() {\n\t\tconst blockData = {\n\t\t\ttype: 'text-image',\n\t\t\ttext: 'This is a block from the API.'\n\t\t}\n\n\t\tfetch(this.endpoint, {\n\t\t\theaders: {\n\t\t\t\t'Accept': 'application/json',\n\t\t\t\t'Content-Type': 'application/json'\n\t\t\t},\n\t\t\tmethod: 'POST',\n\t\t\tbody: JSON.stringify(blockData)\n\t\t})\n\t\t.then(function(res){ console.log(res) })\n\t\t.catch(function(res){ console.log(res) })\n\t}\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BlocksApi);\n\n//# sourceURL=webpack:///./src/js/blocksApi.js?")},0:function _(module,exports,__webpack_require__){eval('__webpack_require__(/*! /Users/bowles2012/Sites/blocks/src/js/app.js */"./src/js/app.js");\nmodule.exports = __webpack_require__(/*! /Users/bowles2012/Sites/blocks/src/js/blocksApi.js */"./src/js/blocksApi.js");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js_./src/js/blocksApi.js?')}});