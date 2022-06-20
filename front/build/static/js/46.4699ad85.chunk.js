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
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[46],{1328:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(1380);function i(e,n,t,r,a,o,i){try{var l=e[o](i),c=l.value}catch(s){return void t(s)}l.done?n(c):Promise.resolve(c).then(r,a)}n.default=function(e){var n=e.preferred;return{name:e.label||"BlockWallet",iconSrc:e.iconSrc,svg:e.svg||'\n\t<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n\t\t<path fill-rule="evenodd" clip-rule="evenodd" d="M15 30C23.2843 30 30 23.2843 30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30ZM23.125 6.875H6.875V23.125H23.125V6.875Z" fill="currentColor"/>\n\t</svg>\n',wallet:function(){var e,n=(e=a.a.mark((function e(n){var t,r,o,i;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.getProviderName,r=n.createModernProviderInterface,o=n.createLegacyProviderInterface,i=window.ethereum||window.web3&&window.web3.currentProvider,e.abrupt("return",{provider:i,interface:i&&"BlockWallet"===t(i)?"function"===typeof i.enable?r(i):o(i):null});case 3:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,a){var o=e.apply(n,t);function l(e){i(o,r,a,l,c,"next",e)}function c(e){i(o,r,a,l,c,"throw",e)}l(void 0)}))});return function(e){return n.apply(this,arguments)}}(),type:"injected",link:"https://www.blockwallet.io/",installMessage:o.a,desktop:!0,mobile:!1,preferred:n}}},1380:function(e,n,t){"use strict";t.d(n,"a",(function(){return r})),t.d(n,"b",(function(){return a}));var r=function(e){var n=e.currentWallet,t=e.selectedWallet;return n?'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    We have detected that you already have\n    <b>'.concat(n,"</b>\n    installed. If you would prefer to use\n    <b>").concat(t,'</b>\n    instead, then click below to install.\n    </p>\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    <b>Tip:</b>\n    If you already have ').concat(t,' installed, check your\n    browser extension settings to make sure that you have it enabled\n    and that you have disabled any other browser extension wallets.\n    <span\n      class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick="window.location.reload();">\n      Then refresh the page.\n    </span>\n    </p>\n    '):'\n    <p style="font-size: 0.889rem; font-family: inherit; margin: 0.889rem 0;">\n    You\'ll need to install <b>'.concat(t,'</b> to continue. Once you have it installed, go ahead and\n    <span\n    class="bn-onboard-clickable"\n      style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;"\n      onclick={window.location.reload();}>\n      refresh the page.\n    </span>\n    ').concat("Opera"===t?'<br><br><i>Hint: If you already have Opera installed, make sure that your web3 wallet is <a style="color: #4a90e2; font-size: 0.889rem; font-family: inherit;" class="bn-onboard-clickable" href="https://help.opera.com/en/touch/crypto-wallet/" rel="noreferrer noopener" target="_blank">enabled</a></i>':"","\n    </p>\n    ")},a=function(e){var n=e.selectedWallet;return'\n  <p style="font-size: 0.889rem;">\n  Tap the button below to <b>Open '.concat(n,"</b>. Please access this site on ").concat(n,"'s in-app browser for a seamless experience.\n  </p>\n  ")}}}]);
//# sourceMappingURL=46.4699ad85.chunk.js.map