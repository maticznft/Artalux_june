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
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[70],{1307:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(1545);function i(e,n,t,r,o,a,i){try{var c=e[a](i),u=c.value}catch(s){return void t(s)}c.done?n(u):Promise.resolve(u).then(r,o)}n.default=function(e){var n=e.rpcUrl,r=e.appName,c=e.appLogoUrl,u=e.networkId,s=e.preferred,l=e.label,p=e.iconSrc;return{name:l||"Coinbase Wallet",svg:e.svg||a.a,iconSrc:p,wallet:function(){var e,a=(e=o.a.mark((function e(a){var i,s,l,p,f,d,v;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return i=a.getBalance,s=a.getAddress,l=a.getNetwork,e.next=3,Promise.all([t.e(2),t.e(5),t.e(20),t.e(90)]).then(t.t.bind(null,2186,7));case 3:return p=e.sent,f=p.default,d=new f({appName:r,appLogoUrl:c}),v=d.makeWeb3Provider(n,u),e.abrupt("return",{provider:v,interface:{name:"Coinbase Wallet",connect:function(){return new Promise((function(e,n){v.enable().then((function(n){return e(n)})).catch((function(){return n({message:"This dapp needs access to your account information."})}))}))},disconnect:function(){v.disconnect()},address:{get:function(){return s(v)}},network:{get:function(){return l(v)}},balance:{get:function(){return i(v)}}}});case 8:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,o){var a=e.apply(n,t);function c(e){i(a,r,o,c,u,"next",e)}function u(e){i(a,r,o,c,u,"throw",e)}c(void 0)}))});return function(e){return a.apply(this,arguments)}}(),type:"sdk",desktop:!0,preferred:s}}},1545:function(e,n,t){"use strict";t.d(n,"a",(function(){return r}));var r='\n\t<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#1652F0"/>\n\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M5.45508 20.0006C5.45508 28.0338 11.9673 34.546 20.0006 34.546C28.0338 34.546 34.546 28.0338 34.546 20.0006C34.546 11.9673 28.0338 5.45508 20.0006 5.45508C11.9673 5.45508 5.45508 11.9673 5.45508 20.0006ZM17.3137 15.3145C16.2091 15.3145 15.3137 16.2099 15.3137 17.3145V22.6882C15.3137 23.7928 16.2091 24.6882 17.3137 24.6882H22.6874C23.792 24.6882 24.6874 23.7928 24.6874 22.6882V17.3145C24.6874 16.2099 23.792 15.3145 22.6874 15.3145H17.3137Z" fill="white"/>\n\t</svg>\n'}}]);
//# sourceMappingURL=70.af1b7ed6.chunk.js.map