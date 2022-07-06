/*!

=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-pro-react
* Copyright 2020 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[8],{1478:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Methods=void 0,function(e){e.sendTransactions="sendTransactions",e.rpcCall="rpcCall",e.getChainInfo="getChainInfo",e.getSafeInfo="getSafeInfo",e.getTxBySafeTxHash="getTxBySafeTxHash",e.getSafeBalances="getSafeBalances",e.signMessage="signMessage"}(t.Methods||(t.Methods={}))},1823:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getSDKVersion=void 0;var a=s(n(1824));t.default=a.default,i(n(1824),t),i(n(2475),t),i(n(1478),t),i(n(1825),t);var o=n(1826);Object.defineProperty(t,"getSDKVersion",{enumerable:!0,get:function(){return o.getSDKVersion}})},1824:function(e,t,n){"use strict";var r=n(65),i=n(64),s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(2468)),o=n(2471),u=n(2472),c=n(2473),f=r((function e(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};i(this,e);var n=t.whitelistedDomains,r=void 0===n?null:n,s=t.debug,f=void 0!==s&&s;this.communicator=new a.default(r,f),this.eth=new u.Eth(this.communicator),this.txs=new o.TXs(this.communicator),this.safe=new c.Safe(this.communicator)}));t.default=f},1825:function(e,t,n){"use strict";var r=n(65),i=n(64);Object.defineProperty(t,"__esModule",{value:!0}),t.MessageFormatter=void 0;var s=n(1826),a=n(2470),o=r((function e(){i(this,e)}));t.MessageFormatter=o,o.makeRequest=function(e,t){return{id:(0,a.generateRequestId)(),method:e,params:t,env:{sdkVersion:(0,s.getSDKVersion)()}}},o.makeResponse=function(e,t,n){return{id:e,success:!0,version:n,data:t}},o.makeErrorResponse=function(e,t,n){return{id:e,success:!1,error:t,version:n}}},1826:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getSDKVersion=void 0;var i=r(n(2469));t.getSDKVersion=function(){return i.default.version.slice(0,5)}},1827:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RPC_CALLS=void 0,t.RPC_CALLS={eth_call:"eth_call",eth_gasPrice:"eth_gasPrice",eth_getLogs:"eth_getLogs",eth_getBalance:"eth_getBalance",eth_getCode:"eth_getCode",eth_getBlockByHash:"eth_getBlockByHash",eth_getBlockByNumber:"eth_getBlockByNumber",eth_getStorageAt:"eth_getStorageAt",eth_getTransactionByHash:"eth_getTransactionByHash",eth_getTransactionReceipt:"eth_getTransactionReceipt",eth_getTransactionCount:"eth_getTransactionCount",eth_estimateGas:"eth_estimateGas"}},2468:function(e,t,n){"use strict";var r=n(65),i=n(64),s=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||s(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0});var o=n(1825),u=r((function e(){var t=this,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,r=arguments.length>1&&void 0!==arguments[1]&&arguments[1];i(this,e),this.allowedOrigins=null,this.callbacks=new Map,this.debugMode=!1,this.isValidMessage=function(e){var n=e.origin,r=e.data,i=!r,s=e.source===window.parent,a=("undefined"!==typeof r.version&&parseInt(r.version.split(".")[0]))>=1,o=!0;return Array.isArray(t.allowedOrigins)&&(o=void 0!==t.allowedOrigins.find((function(e){return e.test(n)}))),!i&&s&&a&&o},this.logIncomingMessage=function(e){console.info("Safe Apps SDK v1: A message was received from origin ".concat(e.origin,". "),e.data)},this.onParentMessage=function(e){t.isValidMessage(e)&&(t.debugMode&&t.logIncomingMessage(e),t.handleIncomingMessage(e.data))},this.handleIncomingMessage=function(e){var n=e.id,r=t.callbacks.get(n);r&&(r(e),t.callbacks.delete(n))},this.send=function(e,n){var r=o.MessageFormatter.makeRequest(e,n);if("undefined"===typeof window)throw new Error("Window doesn't exist");return window.parent.postMessage(r,"*"),new Promise((function(e,n){t.callbacks.set(r.id,(function(t){t.success?e(t):n(new Error(t.error))}))}))},this.allowedOrigins=n,this.debugMode=r,window.addEventListener("message",this.onParentMessage)}));t.default=u,a(n(1478),t)},2469:function(e){e.exports=JSON.parse('{"name":"@gnosis.pm/safe-apps-sdk","version":"6.3.0","description":"SDK developed to integrate third-party apps with Safe app.","main":"dist/src/index.js","typings":"dist/src/index.d.ts","_files":["dist/**/*","README.md"],"keywords":["Gnosis","sdk","apps"],"scripts":{"test":"jest","format-dist":"sed -i \'s/\\"files\\":/\\"_files\\":/\' dist/package.json","build":"yarn rimraf dist && tsc && yarn format-dist","lint":"tslint -p tsconfig.json"},"author":"Gnosis (https://gnosis.io)","license":"MIT","dependencies":{"@gnosis.pm/safe-react-gateway-sdk":"^2.8.5","ethers":"^5.4.7"},"devDependencies":{"rimraf":"^3.0.2"},"repository":{"type":"git","url":"git+https://github.com/gnosis/safe-apps-sdk.git"},"bugs":{"url":"https://github.com/gnosis/safe-apps-sdk/issues"},"homepage":"https://github.com/gnosis/safe-apps-sdk#readme","publishConfig":{"access":"public"}}')},2470:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.generateRequestId=void 0;var r=function(e){return e.toString(16).padStart(2,"0")};t.generateRequestId=function(){return"undefined"!==typeof window?function(e){var t=new Uint8Array((e||40)/2);return window.crypto.getRandomValues(t),Array.from(t,r).join("")}(10):(new Date).getTime().toString(36)}},2471:function(e,t,n){"use strict";var r=n(1),i=n(84),s=n(64),a=n(65);Object.defineProperty(t,"__esModule",{value:!0}),t.TXs=void 0;var o=n(1478),u=function(){function e(t){s(this,e),this.communicator=t}return a(e,[{key:"getBySafeTxHash",value:function(){var e=i(r.mark((function e(t){var n;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}throw new Error("Invalid safeTxHash");case 2:return e.next=4,this.communicator.send(o.Methods.getTxBySafeTxHash,{safeTxHash:t});case 4:return n=e.sent,e.abrupt("return",n.data);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"signMessage",value:function(){var e=i(r.mark((function e(t){var n,i;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={message:t},e.next=3,this.communicator.send(o.Methods.signMessage,n);case 3:return i=e.sent,e.abrupt("return",i.data);case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"send",value:function(){var e=i(r.mark((function e(t){var n,i,s,a;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=t.txs,i=t.params,n&&n.length){e.next=3;break}throw new Error("No transactions were passed");case 3:return s={txs:n,params:i},e.next=6,this.communicator.send(o.Methods.sendTransactions,s);case 6:return a=e.sent,e.abrupt("return",a.data);case 8:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.TXs=u},2472:function(e,t,n){"use strict";var r=n(1),i=n(84),s=n(64),a=n(65);Object.defineProperty(t,"__esModule",{value:!0}),t.Eth=void 0;var o=n(1827),u=n(1478),c={defaultBlockParam:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"latest";return e},returnFullTxObjectParam:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e},blockNumberToHex:function(e){return Number.isInteger(e)?"0x".concat(e.toString(16)):e}},f=function(){function e(t){var n=this;s(this,e),this.communicator=t,this.call=this.buildRequest({call:o.RPC_CALLS.eth_call,formatters:[null,c.defaultBlockParam]}),this.getBalance=this.buildRequest({call:o.RPC_CALLS.eth_getBalance,formatters:[null,c.defaultBlockParam]}),this.getCode=this.buildRequest({call:o.RPC_CALLS.eth_getCode,formatters:[null,c.defaultBlockParam]}),this.getStorageAt=this.buildRequest({call:o.RPC_CALLS.eth_getStorageAt,formatters:[null,c.blockNumberToHex,c.defaultBlockParam]}),this.getPastLogs=this.buildRequest({call:o.RPC_CALLS.eth_getLogs}),this.getBlockByHash=this.buildRequest({call:o.RPC_CALLS.eth_getBlockByHash,formatters:[null,c.returnFullTxObjectParam]}),this.getBlockByNumber=this.buildRequest({call:o.RPC_CALLS.eth_getBlockByNumber,formatters:[c.blockNumberToHex,c.returnFullTxObjectParam]}),this.getTransactionByHash=this.buildRequest({call:o.RPC_CALLS.eth_getTransactionByHash}),this.getTransactionReceipt=this.buildRequest({call:o.RPC_CALLS.eth_getTransactionReceipt}),this.getTransactionCount=this.buildRequest({call:o.RPC_CALLS.eth_getTransactionCount,formatters:[null,c.defaultBlockParam]}),this.getGasPrice=this.buildRequest({call:o.RPC_CALLS.eth_gasPrice}),this.getEstimateGas=function(e){return n.buildRequest({call:o.RPC_CALLS.eth_estimateGas})([e])}}return a(e,[{key:"buildRequest",value:function(e){var t=this,n=e.call,s=e.formatters;return function(){var e=i(r.mark((function e(i){var a,o;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s&&Array.isArray(i)&&s.forEach((function(e,t){e&&(i[t]=e(i[t]))})),a={call:n,params:i||[]},e.next=4,t.communicator.send(u.Methods.rpcCall,a);case 4:return o=e.sent,e.abrupt("return",o.data);case 6:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}}]),e}();t.Eth=f},2473:function(e,t,n){"use strict";var r=n(1),i=n(84),s=n(64),a=n(65);Object.defineProperty(t,"__esModule",{value:!0}),t.Safe=void 0;var o=n(1438),u=n(2474),c=n(1478),f=n(1827),d=function(){function e(t){s(this,e),this.communicator=t}return a(e,[{key:"getChainInfo",value:function(){var e=i(r.mark((function e(){var t;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.communicator.send(c.Methods.getChainInfo,void 0);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"getInfo",value:function(){var e=i(r.mark((function e(){var t;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.communicator.send(c.Methods.getSafeInfo,void 0);case 2:return t=e.sent,e.abrupt("return",t.data);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"experimental_getBalances",value:function(){var e=i(r.mark((function e(){var t,n,i,s,a=arguments;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=a.length>0&&void 0!==a[0]?a[0]:{},n=t.currency,i=void 0===n?"usd":n,e.next=3,this.communicator.send(c.Methods.getSafeBalances,{currency:i});case 3:return s=e.sent,e.abrupt("return",s.data);case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"check1271Signature",value:function(){var e=i(r.mark((function e(t){var n,i,s,a,o,d=arguments;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=d.length>1&&void 0!==d[1]?d[1]:"0x",e.next=3,this.getInfo();case 3:return i=e.sent,s=u.EIP_1271_INTERFACE.encodeFunctionData("isValidSignature",[t,n]),a={call:f.RPC_CALLS.eth_call,params:[{to:i.safeAddress,data:s},"latest"]},e.prev=6,e.next=9,this.communicator.send(c.Methods.rpcCall,a);case 9:return o=e.sent,e.abrupt("return",o.data.slice(0,10).toLowerCase()===u.MAGIC_VALUE);case 13:return e.prev=13,e.t0=e.catch(6),e.abrupt("return",!1);case 16:case"end":return e.stop()}}),e,this,[[6,13]])})));return function(t){return e.apply(this,arguments)}}()},{key:"check1271SignatureBytes",value:function(){var e=i(r.mark((function e(t){var n,i,s,a,d,h,l=arguments;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=l.length>1&&void 0!==l[1]?l[1]:"0x",e.next=3,this.getInfo();case 3:return i=e.sent,s=o.ethers.utils.arrayify(t),a=u.EIP_1271_BYTES_INTERFACE.encodeFunctionData("isValidSignature",[s,n]),d={call:f.RPC_CALLS.eth_call,params:[{to:i.safeAddress,data:a},"latest"]},e.prev=7,e.next=10,this.communicator.send(c.Methods.rpcCall,d);case 10:return h=e.sent,e.abrupt("return",h.data.slice(0,10).toLowerCase()===u.MAGIC_VALUE_BYTES);case 14:return e.prev=14,e.t0=e.catch(7),e.abrupt("return",!1);case 17:case"end":return e.stop()}}),e,this,[[7,14]])})));return function(t){return e.apply(this,arguments)}}()},{key:"calculateMessageHash",value:function(e){return o.ethers.utils.hashMessage(e)}},{key:"isMessageSigned",value:function(){var e=i(r.mark((function e(t){var n,i,s,a=arguments;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.length>1&&void 0!==a[1]?a[1]:"0x",i=this.calculateMessageHash(t),e.next=4,this.isMessageHashSigned(i,n);case 4:return s=e.sent,e.abrupt("return",s);case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"isMessageHashSigned",value:function(){var e=i(r.mark((function e(t){var n,i,s,a,o,u=arguments;return r.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=u.length>1&&void 0!==u[1]?u[1]:"0x",i=[this.check1271Signature.bind(this),this.check1271SignatureBytes.bind(this)],s=0,a=i;case 3:if(!(s<a.length)){e.next=13;break}return o=a[s],e.next=7,o(t,n);case 7:if(!e.sent){e.next=10;break}return e.abrupt("return",!0);case 10:s++,e.next=3;break;case 13:return e.abrupt("return",!1);case 14:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}();t.Safe=d},2474:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MAGIC_VALUE_BYTES=t.MAGIC_VALUE=t.EIP_1271_BYTES_INTERFACE=t.EIP_1271_INTERFACE=void 0;var r=n(1438);t.MAGIC_VALUE="0x1626ba7e";t.MAGIC_VALUE_BYTES="0x20c13b0b";var i=new r.ethers.utils.Interface(["function isValidSignature(bytes32 _dataHash, bytes calldata _signature) external view"]);t.EIP_1271_INTERFACE=i;var s=new r.ethers.utils.Interface(["function isValidSignature(bytes calldata _data, bytes calldata _signature) public view"]);t.EIP_1271_BYTES_INTERFACE=s},2475:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),i=this&&this.__exportStar||function(e,t){for(var n in e)"default"===n||Object.prototype.hasOwnProperty.call(t,n)||r(t,e,n)};Object.defineProperty(t,"__esModule",{value:!0}),i(n(2476),t),i(n(2477),t),i(n(2478),t),i(n(2480),t)},2476:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},2477:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0})},2478:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TransferDirection=t.TransactionStatus=t.TokenType=t.Operation=void 0;var r=n(2479);Object.defineProperty(t,"Operation",{enumerable:!0,get:function(){return r.Operation}}),Object.defineProperty(t,"TokenType",{enumerable:!0,get:function(){return r.TokenType}}),Object.defineProperty(t,"TransactionStatus",{enumerable:!0,get:function(){return r.TransactionStatus}}),Object.defineProperty(t,"TransferDirection",{enumerable:!0,get:function(){return r.TransferDirection}})},2479:function(e,t,n){e.exports=function(){var e={98:function(e,t){var n="undefined"!=typeof self?self:this,r=function(){function e(){this.fetch=!1,this.DOMException=n.DOMException}return e.prototype=n,new e}();!function(e){!function(t){var n="URLSearchParams"in e,r="Symbol"in e&&"iterator"in Symbol,i="FileReader"in e&&"Blob"in e&&function(){try{return new Blob,!0}catch(e){return!1}}(),s="FormData"in e,a="ArrayBuffer"in e;if(a)var o=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],u=ArrayBuffer.isView||function(e){return e&&o.indexOf(Object.prototype.toString.call(e))>-1};function c(e){if("string"!=typeof e&&(e=String(e)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(e))throw new TypeError("Invalid character in header field name");return e.toLowerCase()}function f(e){return"string"!=typeof e&&(e=String(e)),e}function d(e){var t={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return r&&(t[Symbol.iterator]=function(){return t}),t}function h(e){this.map={},e instanceof h?e.forEach((function(e,t){this.append(t,e)}),this):Array.isArray(e)?e.forEach((function(e){this.append(e[0],e[1])}),this):e&&Object.getOwnPropertyNames(e).forEach((function(t){this.append(t,e[t])}),this)}function l(e){if(e.bodyUsed)return Promise.reject(new TypeError("Already read"));e.bodyUsed=!0}function p(e){return new Promise((function(t,n){e.onload=function(){t(e.result)},e.onerror=function(){n(e.error)}}))}function y(e){var t=new FileReader,n=p(t);return t.readAsArrayBuffer(e),n}function g(e){if(e.slice)return e.slice(0);var t=new Uint8Array(e.byteLength);return t.set(new Uint8Array(e)),t.buffer}function v(){return this.bodyUsed=!1,this._initBody=function(e){var t;this._bodyInit=e,e?"string"==typeof e?this._bodyText=e:i&&Blob.prototype.isPrototypeOf(e)?this._bodyBlob=e:s&&FormData.prototype.isPrototypeOf(e)?this._bodyFormData=e:n&&URLSearchParams.prototype.isPrototypeOf(e)?this._bodyText=e.toString():a&&i&&(t=e)&&DataView.prototype.isPrototypeOf(t)?(this._bodyArrayBuffer=g(e.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):a&&(ArrayBuffer.prototype.isPrototypeOf(e)||u(e))?this._bodyArrayBuffer=g(e):this._bodyText=e=Object.prototype.toString.call(e):this._bodyText="",this.headers.get("content-type")||("string"==typeof e?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):n&&URLSearchParams.prototype.isPrototypeOf(e)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},i&&(this.blob=function(){var e=l(this);if(e)return e;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?l(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(y)}),this.text=function(){var e,t,n,r=l(this);if(r)return r;if(this._bodyBlob)return e=this._bodyBlob,n=p(t=new FileReader),t.readAsText(e),n;if(this._bodyArrayBuffer)return Promise.resolve(function(e){for(var t=new Uint8Array(e),n=new Array(t.length),r=0;r<t.length;r++)n[r]=String.fromCharCode(t[r]);return n.join("")}(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},s&&(this.formData=function(){return this.text().then(m)}),this.json=function(){return this.text().then(JSON.parse)},this}h.prototype.append=function(e,t){e=c(e),t=f(t);var n=this.map[e];this.map[e]=n?n+", "+t:t},h.prototype.delete=function(e){delete this.map[c(e)]},h.prototype.get=function(e){return e=c(e),this.has(e)?this.map[e]:null},h.prototype.has=function(e){return this.map.hasOwnProperty(c(e))},h.prototype.set=function(e,t){this.map[c(e)]=f(t)},h.prototype.forEach=function(e,t){for(var n in this.map)this.map.hasOwnProperty(n)&&e.call(t,this.map[n],n,this)},h.prototype.keys=function(){var e=[];return this.forEach((function(t,n){e.push(n)})),d(e)},h.prototype.values=function(){var e=[];return this.forEach((function(t){e.push(t)})),d(e)},h.prototype.entries=function(){var e=[];return this.forEach((function(t,n){e.push([n,t])})),d(e)},r&&(h.prototype[Symbol.iterator]=h.prototype.entries);var b=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function _(e,t){var n,r,i=(t=t||{}).body;if(e instanceof _){if(e.bodyUsed)throw new TypeError("Already read");this.url=e.url,this.credentials=e.credentials,t.headers||(this.headers=new h(e.headers)),this.method=e.method,this.mode=e.mode,this.signal=e.signal,i||null==e._bodyInit||(i=e._bodyInit,e.bodyUsed=!0)}else this.url=String(e);if(this.credentials=t.credentials||this.credentials||"same-origin",!t.headers&&this.headers||(this.headers=new h(t.headers)),this.method=(r=(n=t.method||this.method||"GET").toUpperCase(),b.indexOf(r)>-1?r:n),this.mode=t.mode||this.mode||null,this.signal=t.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&i)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(i)}function m(e){var t=new FormData;return e.trim().split("&").forEach((function(e){if(e){var n=e.split("="),r=n.shift().replace(/\+/g," "),i=n.join("=").replace(/\+/g," ");t.append(decodeURIComponent(r),decodeURIComponent(i))}})),t}function E(e,t){t||(t={}),this.type="default",this.status=void 0===t.status?200:t.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in t?t.statusText:"OK",this.headers=new h(t.headers),this.url=t.url||"",this._initBody(e)}_.prototype.clone=function(){return new _(this,{body:this._bodyInit})},v.call(_.prototype),v.call(E.prototype),E.prototype.clone=function(){return new E(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new h(this.headers),url:this.url})},E.error=function(){var e=new E(null,{status:0,statusText:""});return e.type="error",e};var T=[301,302,303,307,308];E.redirect=function(e,t){if(-1===T.indexOf(t))throw new RangeError("Invalid status code");return new E(null,{status:t,headers:{location:e}})},t.DOMException=e.DOMException;try{new t.DOMException}catch(e){t.DOMException=function(e,t){this.message=e,this.name=t;var n=Error(e);this.stack=n.stack},t.DOMException.prototype=Object.create(Error.prototype),t.DOMException.prototype.constructor=t.DOMException}function A(e,n){return new Promise((function(r,s){var a=new _(e,n);if(a.signal&&a.signal.aborted)return s(new t.DOMException("Aborted","AbortError"));var o=new XMLHttpRequest;function u(){o.abort()}o.onload=function(){var e,t,n={status:o.status,statusText:o.statusText,headers:(e=o.getAllResponseHeaders()||"",t=new h,e.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach((function(e){var n=e.split(":"),r=n.shift().trim();if(r){var i=n.join(":").trim();t.append(r,i)}})),t)};n.url="responseURL"in o?o.responseURL:n.headers.get("X-Request-URL");var i="response"in o?o.response:o.responseText;r(new E(i,n))},o.onerror=function(){s(new TypeError("Network request failed"))},o.ontimeout=function(){s(new TypeError("Network request failed"))},o.onabort=function(){s(new t.DOMException("Aborted","AbortError"))},o.open(a.method,a.url,!0),"include"===a.credentials?o.withCredentials=!0:"omit"===a.credentials&&(o.withCredentials=!1),"responseType"in o&&i&&(o.responseType="blob"),a.headers.forEach((function(e,t){o.setRequestHeader(t,e)})),a.signal&&(a.signal.addEventListener("abort",u),o.onreadystatechange=function(){4===o.readyState&&a.signal.removeEventListener("abort",u)}),o.send(void 0===a._bodyInit?null:a._bodyInit)}))}A.polyfill=!0,e.fetch||(e.fetch=A,e.Headers=h,e.Request=_,e.Response=E),t.Headers=h,t.Request=_,t.Response=E,t.fetch=A,Object.defineProperty(t,"__esModule",{value:!0})}({})}(r),r.fetch.ponyfill=!0,delete r.fetch.polyfill;var i=r;(t=i.fetch).default=i.fetch,t.fetch=i.fetch,t.Headers=i.Headers,t.Request=i.Request,t.Response=i.Response,e.exports=t}},t={};function n(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r].call(s.exports,s,s.exports,n),s.exports}n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,{a:t}),t},n.d=function(e,t){for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};return function(){"use strict";n.r(r),n.d(r,{FEATURES:function(){return f},GAS_PRICE_TYPE:function(){return c},LabelValue:function(){return o},Operation:function(){return t},RPC_AUTHENTICATION:function(){return u},SafeAppAccessPolicyTypes:function(){return e},TokenType:function(){return d},TransactionStatus:function(){return i},TransactionTokenType:function(){return a},TransferDirection:function(){return s},getBalances:function(){return v},getChainConfig:function(){return S},getChainsConfig:function(){return O},getCollectibles:function(){return m},getDecodedData:function(){return x},getFiatCurrencies:function(){return b},getMasterCopies:function(){return P},getOwnedSafes:function(){return _},getSafeApps:function(){return C},getSafeInfo:function(){return g},getTransactionDetails:function(){return A},getTransactionHistory:function(){return E},getTransactionQueue:function(){return T},postSafeGasEstimation:function(){return I},proposeTransaction:function(){return w}});var e,t,i,s,a,o,u,c,f,d,h=n(98),l=n.n(h);function p(e,t){return n=this,i=function(){var n,r,i,s,a;return function(e,t){var n,r,i,s,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return s={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function o(s){return function(o){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&s[0]?r.return:s[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,s[1])).done)return i;switch(r=0,i&&(s=[2&s[0],i.value]),s[0]){case 0:case 1:i=s;break;case 4:return a.label++,{value:s[1],done:!1};case 5:a.label++,r=s[1],s=[0];continue;case 7:s=a.ops.pop(),a.trys.pop();continue;default:if(!((i=(i=a.trys).length>0&&i[i.length-1])||6!==s[0]&&2!==s[0])){a=0;continue}if(3===s[0]&&(!i||s[1]>i[0]&&s[1]<i[3])){a.label=s[1];break}if(6===s[0]&&a.label<i[1]){a.label=i[1],i=s;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(s);break}i[2]&&a.ops.pop(),a.trys.pop();continue}s=t.call(e,a)}catch(e){s=[6,e],r=0}finally{n=i=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,o])}}}(this,(function(o){switch(o.label){case 0:return null!=t&&(n={method:"POST",body:"string"==typeof t?t:JSON.stringify(t),headers:{"Content-Type":"application/json"}}),[4,l()(e,n)];case 1:return[4,(r=o.sent()).json()];case 2:if(i=o.sent(),!r.ok){s="";try{s=(a=i).code+": "+a.message}catch(e){s=r.statusText}throw new Error(s)}return[2,i]}}))},new((r=void 0)||(r=Promise))((function(e,t){function s(e){try{o(i.next(e))}catch(e){t(e)}}function a(e){try{o(i.throw(e))}catch(e){t(e)}}function o(t){var n;t.done?e(t.value):(n=t.value,n instanceof r?n:new r((function(e){e(n)}))).then(s,a)}o((i=i.apply(n,[])).next())}));var n,r,i}function y(e,t,n,r){if(r)return p(r);var i=n;return p(""+e+function(e,t){return t?Object.keys(t).reduce((function(e,n){return function(e,t,n){return e.replace(new RegExp("\\{"+t+"\\}","g"),n)}(e,n,String(t[n]))}),e):e}(t,null==i?void 0:i.path)+function(e){if(!e)return"";var t=new URLSearchParams;Object.keys(e).forEach((function(n){null!=e[n]&&t.append(n,String(e[n]))}));var n=t.toString();return n?"?"+n:""}(null==i?void 0:i.query),null==i?void 0:i.body)}function g(e,t,n){return y(e,"/v1/chains/{chainId}/safes/{address}",{path:{chainId:t,address:n}})}function v(e,t,n,r,i){return void 0===r&&(r="usd"),void 0===i&&(i={}),y(e,"/v1/chains/{chainId}/safes/{address}/balances/{currency}",{path:{chainId:t,address:n,currency:r},query:i})}function b(e){return y(e,"/v1/balances/supported-fiat-codes")}function _(e,t,n){return y(e,"/v1/chains/{chainId}/owners/{address}/safes",{path:{chainId:t,address:n}})}function m(e,t,n,r){return void 0===r&&(r={}),y(e,"/v1/chains/{chainId}/safes/{address}/collectibles",{path:{chainId:t,address:n},query:r})}function E(e,t,n,r){return y(e,"/v1/chains/{chainId}/safes/{safe_address}/transactions/history",{path:{chainId:t,safe_address:n},query:{}},r)}function T(e,t,n,r){return y(e,"/v1/chains/{chainId}/safes/{safe_address}/transactions/queued",{path:{chainId:t,safe_address:n},query:{}},r)}function A(e,t,n){return y(e,"/v1/chains/{chainId}/transactions/{transactionId}",{path:{chainId:t,transactionId:n}})}function I(e,t,n,r){return y(e,"/v2/chains/{chainId}/safes/{safe_address}/multisig-transactions/estimations",{path:{chainId:t,safe_address:n},body:r})}function w(e,t,n,r){return y(e,"/v1/chains/{chainId}/transactions/{safe_address}/propose",{path:{chainId:t,safe_address:n},body:r})}function O(e,t){return y(e,"/v1/chains",{query:t})}function S(e,t){return y(e,"/v1/chains/{chainId}",{path:{chainId:t}})}function C(e,t,n){return void 0===n&&(n={}),y(e,"/v1/chains/{chainId}/safe-apps",{path:{chainId:t},query:n})}function P(e,t){return y(e,"/v1/chains/{chainId}/about/master-copies",{path:{chainId:t}})}function x(e,t,n){return y(e,"/v1/chains/{chainId}/data-decoder",{path:{chainId:t},body:{data:n}})}!function(e){e.NoRestrictions="NO_RESTRICTIONS",e.DomainAllowlist="DOMAIN_ALLOWLIST"}(e||(e={})),function(e){e[e.CALL=0]="CALL",e[e.DELEGATE=1]="DELEGATE"}(t||(t={})),function(e){e.AWAITING_CONFIRMATIONS="AWAITING_CONFIRMATIONS",e.AWAITING_EXECUTION="AWAITING_EXECUTION",e.CANCELLED="CANCELLED",e.FAILED="FAILED",e.SUCCESS="SUCCESS",e.PENDING="PENDING",e.WILL_BE_REPLACED="WILL_BE_REPLACED"}(i||(i={})),function(e){e.INCOMING="INCOMING",e.OUTGOING="OUTGOING",e.UNKNOWN="UNKNOWN"}(s||(s={})),function(e){e.ERC20="ERC20",e.ERC721="ERC721",e.NATIVE_COIN="NATIVE_COIN"}(a||(a={})),function(e){e.Queued="Queued",e.Next="Next"}(o||(o={})),function(e){e.API_KEY_PATH="API_KEY_PATH",e.NO_AUTHENTICATION="NO_AUTHENTICATION",e.UNKNOWN="UNKNOWN"}(u||(u={})),function(e){e.ORACLE="ORACLE",e.FIXED="FIXED",e.UNKNOWN="UNKNOWN"}(c||(c={})),function(e){e.ERC721="ERC721",e.SAFE_APPS="SAFE_APPS",e.CONTRACT_INTERACTION="CONTRACT_INTERACTION",e.DOMAIN_LOOKUP="DOMAIN_LOOKUP",e.SPENDING_LIMIT="SPENDING_LIMIT",e.EIP1559="EIP1559",e.SAFE_TX_GAS_OPTIONAL="SAFE_TX_GAS_OPTIONAL"}(f||(f={})),function(e){e.ERC20="ERC20",e.ERC721="ERC721",e.NATIVE_TOKEN="NATIVE_TOKEN"}(d||(d={}))}(),r}()},2480:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});n(1478)}}]);
//# sourceMappingURL=8.44a96d45.chunk.js.map