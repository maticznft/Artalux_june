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
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[74],{1332:function(n,t,e){"use strict";e.r(t);var r=e(1),a=e.n(r),c=(e(298),e(388));e(148),e(299),e(300);function i(n,t,e,r,a,c,i){try{var u=n[c](i),o=u.value}catch(s){return void e(s)}u.done?t(o):Promise.resolve(o).then(r,a)}function u(n){return function(){var t=this,e=arguments;return new Promise((function(r,a){var c=n.apply(t,e);function u(n){i(c,r,a,u,o,"next",n)}function o(n){i(c,r,a,u,o,"throw",n)}u(void 0)}))}}t.default=function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{minimumBalance:"0"},t=n.minimumBalance,e=n.heading,r=n.description,i=n.icon,o=n.html,s=n.button;return function(){var n=u(a.a.mark((function n(u){var l,f,h,p;return a.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(l=u.balance,f=u.BigNumber,h=u.stateSyncStatus,p=u.stateStore,null!==l){n.next=10;break}if(!h.balance){n.next=10;break}return n.prev=3,n.next=6,h.balance;case 6:n.next=10;break;case 8:n.prev=8,n.t0=n.catch(3);case 10:if(!f(p.balance.get()).lt(f(t))){n.next=12;break}return n.abrupt("return",{heading:e||"Get Some ETH",description:r||"Your current account has less than the necessary minimum balance of ".concat(f(t).div(f("1000000000000000000")).toString(10)," ETH."),eventCode:"nsfFail",icon:i||c.k,html:o,button:s});case 12:case"end":return n.stop()}}),n,null,[[3,8]])})));return function(t){return n.apply(this,arguments)}}()}}}]);
//# sourceMappingURL=74.867f9931.chunk.js.map