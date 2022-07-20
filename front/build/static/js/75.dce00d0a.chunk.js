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
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[75],{1330:function(n,t,e){"use strict";e.r(t);var r=e(1),a=e.n(r),o=(e(298),e(387));e(148),e(299),e(300);function i(n,t,e,r,a,o,i){try{var u=n[o](i),s=u.value}catch(c){return void e(c)}u.done?t(s):Promise.resolve(s).then(r,a)}function u(n){return function(){var t=this,e=arguments;return new Promise((function(r,a){var o=n.apply(t,e);function u(n){i(o,r,a,u,s,"next",n)}function s(n){i(o,r,a,u,s,"throw",n)}u(void 0)}))}}t.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=n.heading,e=n.description,r=n.icon,i=n.html,s=n.button;return function(){var n=u(a.a.mark((function n(u){var c,d,l,f;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(c=u.wallet,d=u.address,l=u.stateSyncStatus,f=u.stateStore,null!==d){n.next=5;break}if(!l.address){n.next=5;break}return n.next=5,new Promise((function(n){l.address&&l.address.then(n),setTimeout((function(){null===d&&n(void 0)}),500)}));case 5:if(f.address.get()||!c||!c.name){n.next=7;break}return n.abrupt("return",{heading:t||"Login and Authorize Your Wallet",description:e||"This dapp requires access to your wallet, please login and authorize access to your ".concat(c.name," accounts to continue."),eventCode:"loginFail",action:c.connect,icon:r||o.g,html:i,button:s});case 7:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=75.dce00d0a.chunk.js.map