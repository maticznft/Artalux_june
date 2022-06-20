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
(this.webpackJsonpArtalux=this.webpackJsonpArtalux||[]).push([[32],{1839:function(e,t,n){e.exports=n(1840)()},1840:function(e,t,n){"use strict";var r=n(1841);function o(){}function i(){}i.resetWarningCache=o,e.exports=function(){function e(e,t,n,o,i,a){if(a!==r){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}function t(){return e}e.isRequired=e;var n={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:i,resetWarningCache:o};return n.PropTypes=n,n}},1841:function(e,t,n){"use strict";e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},1842:function(e,t,n){"use strict";t.__esModule=!0,t.default=function(e,t){if(e&&t){var n=Array.isArray(t)?t:t.split(","),r=e.name||"",o=(e.type||"").toLowerCase(),i=o.replace(/\/.*$/,"");return n.some((function(e){var t=e.trim().toLowerCase();return"."===t.charAt(0)?r.toLowerCase().endsWith(t):t.endsWith("/*")?i===t.replace(/\/.*$/,""):o===t}))}return!0}},2491:function(e,t,n){"use strict";var r=n(0),o=n.n(r),i=n(1839),a=n.n(i);function c(e,t,n,r){return new(n||(n=Promise))((function(o,i){function a(e){try{u(r.next(e))}catch(t){i(t)}}function c(e){try{u(r.throw(e))}catch(t){i(t)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,c)}u((r=r.apply(e,t||[])).next())}))}function u(e,t){var n,r,o,i,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:c(0),throw:c(1),return:c(2)},"function"===typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function c(i){return function(c){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return a.label++,{value:i[1],done:!1};case 5:a.label++,r=i[1],i=[0];continue;case 7:i=a.ops.pop(),a.trys.pop();continue;default:if(!(o=(o=a.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){a=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){a.label=i[1];break}if(6===i[0]&&a.label<o[1]){a.label=o[1],o=i;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(i);break}o[2]&&a.ops.pop(),a.trys.pop();continue}i=t.call(e,a)}catch(c){i=[6,c],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,c])}}}Object.create;function l(e,t){var n="function"===typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(c){o={error:c}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function s(e,t,n){if(n||2===arguments.length)for(var r,o=0,i=t.length;o<i;o++)!r&&o in t||(r||(r=Array.prototype.slice.call(t,0,o)),r[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))}Object.create;var f=new Map([["aac","audio/aac"],["abw","application/x-abiword"],["arc","application/x-freearc"],["avif","image/avif"],["avi","video/x-msvideo"],["azw","application/vnd.amazon.ebook"],["bin","application/octet-stream"],["bmp","image/bmp"],["bz","application/x-bzip"],["bz2","application/x-bzip2"],["cda","application/x-cdf"],["csh","application/x-csh"],["css","text/css"],["csv","text/csv"],["doc","application/msword"],["docx","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],["eot","application/vnd.ms-fontobject"],["epub","application/epub+zip"],["gz","application/gzip"],["gif","image/gif"],["heic","image/heic"],["heif","image/heif"],["htm","text/html"],["html","text/html"],["ico","image/vnd.microsoft.icon"],["ics","text/calendar"],["jar","application/java-archive"],["jpeg","image/jpeg"],["jpg","image/jpeg"],["js","text/javascript"],["json","application/json"],["jsonld","application/ld+json"],["mid","audio/midi"],["midi","audio/midi"],["mjs","text/javascript"],["mp3","audio/mpeg"],["mp4","video/mp4"],["mpeg","video/mpeg"],["mpkg","application/vnd.apple.installer+xml"],["odp","application/vnd.oasis.opendocument.presentation"],["ods","application/vnd.oasis.opendocument.spreadsheet"],["odt","application/vnd.oasis.opendocument.text"],["oga","audio/ogg"],["ogv","video/ogg"],["ogx","application/ogg"],["opus","audio/opus"],["otf","font/otf"],["png","image/png"],["pdf","application/pdf"],["php","application/x-httpd-php"],["ppt","application/vnd.ms-powerpoint"],["pptx","application/vnd.openxmlformats-officedocument.presentationml.presentation"],["rar","application/vnd.rar"],["rtf","application/rtf"],["sh","application/x-sh"],["svg","image/svg+xml"],["swf","application/x-shockwave-flash"],["tar","application/x-tar"],["tif","image/tiff"],["tiff","image/tiff"],["ts","video/mp2t"],["ttf","font/ttf"],["txt","text/plain"],["vsd","application/vnd.visio"],["wav","audio/wav"],["weba","audio/webm"],["webm","video/webm"],["webp","image/webp"],["woff","font/woff"],["woff2","font/woff2"],["xhtml","application/xhtml+xml"],["xls","application/vnd.ms-excel"],["xlsx","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],["xml","application/xml"],["xul","application/vnd.mozilla.xul+xml"],["zip","application/zip"],["7z","application/x-7z-compressed"],["mkv","video/x-matroska"],["mov","video/quicktime"],["msg","application/vnd.ms-outlook"]]);function p(e,t){var n=function(e){var t=e.name;if(t&&-1!==t.lastIndexOf(".")&&!e.type){var n=t.split(".").pop().toLowerCase(),r=f.get(n);r&&Object.defineProperty(e,"type",{value:r,writable:!1,configurable:!1,enumerable:!0})}return e}(e);if("string"!==typeof n.path){var r=e.webkitRelativePath;Object.defineProperty(n,"path",{value:"string"===typeof t?t:"string"===typeof r&&r.length>0?r:e.name,writable:!1,configurable:!1,enumerable:!0})}return n}var d=[".DS_Store","Thumbs.db"];function v(e){return"object"===typeof e&&null!==e}function m(e){return h(e.target.files).map((function(e){return p(e)}))}function b(e){return c(this,void 0,void 0,(function(){return u(this,(function(t){switch(t.label){case 0:return[4,Promise.all(e.map((function(e){return e.getFile()})))];case 1:return[2,t.sent().map((function(e){return p(e)}))]}}))}))}function y(e,t){return c(this,void 0,void 0,(function(){var n;return u(this,(function(r){switch(r.label){case 0:return e.items?(n=h(e.items).filter((function(e){return"file"===e.kind})),"drop"!==t?[2,n]:[4,Promise.all(n.map(w))]):[3,2];case 1:return[2,g(O(r.sent()))];case 2:return[2,g(h(e.files).map((function(e){return p(e)})))]}}))}))}function g(e){return e.filter((function(e){return-1===d.indexOf(e.name)}))}function h(e){if(null===e)return[];for(var t=[],n=0;n<e.length;n++){var r=e[n];t.push(r)}return t}function w(e){if("function"!==typeof e.webkitGetAsEntry)return j(e);var t=e.webkitGetAsEntry();return t&&t.isDirectory?x(t):j(e)}function O(e){return e.reduce((function(e,t){return s(s([],l(e),!1),l(Array.isArray(t)?O(t):[t]),!1)}),[])}function j(e){var t=e.getAsFile();if(!t)return Promise.reject("".concat(e," is not a File"));var n=p(t);return Promise.resolve(n)}function D(e){return c(this,void 0,void 0,(function(){return u(this,(function(t){return[2,e.isDirectory?x(e):A(e)]}))}))}function x(e){var t=e.createReader();return new Promise((function(e,n){var r=[];!function o(){var i=this;t.readEntries((function(t){return c(i,void 0,void 0,(function(){var i,a,c;return u(this,(function(u){switch(u.label){case 0:if(t.length)return[3,5];u.label=1;case 1:return u.trys.push([1,3,,4]),[4,Promise.all(r)];case 2:return i=u.sent(),e(i),[3,4];case 3:return a=u.sent(),n(a),[3,4];case 4:return[3,6];case 5:c=Promise.all(t.map(D)),r.push(c),o(),u.label=6;case 6:return[2]}}))}))}),(function(e){n(e)}))}()}))}function A(e){return c(this,void 0,void 0,(function(){return u(this,(function(t){return[2,new Promise((function(t,n){e.file((function(n){var r=p(n,e.fullPath);t(r)}),(function(e){n(e)}))}))]}))}))}var E=n(1842),k=n.n(E);function F(e){return function(e){if(Array.isArray(e))return C(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||P(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function S(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(u){c=!0,o=u}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(e,t)||P(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function P(e,t){if(e){if("string"===typeof e)return C(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?C(e,t):void 0}}function C(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var z=function(e){e=Array.isArray(e)&&1===e.length?e[0]:e;var t=Array.isArray(e)?"one of ".concat(e.join(", ")):e;return{code:"file-invalid-type",message:"File type must be ".concat(t)}},R=function(e){return{code:"file-too-large",message:"File is larger than ".concat(e," ").concat(1===e?"byte":"bytes")}},T=function(e){return{code:"file-too-small",message:"File is smaller than ".concat(e," ").concat(1===e?"byte":"bytes")}},I={code:"too-many-files",message:"Too many files"};function _(e,t){var n="application/x-moz-file"===e.type||k()(e,t);return[n,n?null:z(t)]}function M(e,t,n){if(L(e.size))if(L(t)&&L(n)){if(e.size>n)return[!1,R(n)];if(e.size<t)return[!1,T(t)]}else{if(L(t)&&e.size<t)return[!1,T(t)];if(L(n)&&e.size>n)return[!1,R(n)]}return[!0,null]}function L(e){return void 0!==e&&null!==e}function B(e){var t=e.files,n=e.accept,r=e.minSize,o=e.maxSize,i=e.multiple,a=e.maxFiles,c=e.validator;return!(!i&&t.length>1||i&&a>=1&&t.length>a)&&t.every((function(e){var t=S(_(e,n),1)[0],i=S(M(e,r,o),1)[0],a=c?c(e):null;return t&&i&&!a}))}function K(e){return"function"===typeof e.isPropagationStopped?e.isPropagationStopped():"undefined"!==typeof e.cancelBubble&&e.cancelBubble}function U(e){return e.dataTransfer?Array.prototype.some.call(e.dataTransfer.types,(function(e){return"Files"===e||"application/x-moz-file"===e})):!!e.target&&!!e.target.files}function W(e){e.preventDefault()}function $(e){return-1!==e.indexOf("MSIE")||-1!==e.indexOf("Trident/")}function H(e){return-1!==e.indexOf("Edge/")}function q(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:window.navigator.userAgent;return $(e)||H(e)}function G(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];return function(e){for(var n=arguments.length,r=new Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];return t.some((function(t){return!K(e)&&t&&t.apply(void 0,[e].concat(r)),K(e)}))}}function N(){return"showOpenFilePicker"in window}function J(e){return L(e)?Object.entries(e).filter((function(e){var t=S(e,2),n=t[0],r=t[1],o=!0;return X(n)||(console.warn('Skipped "'.concat(n,'" because it is not a valid MIME type. Check https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types for a list of valid MIME types.')),o=!1),Array.isArray(r)&&r.every(Z)||(console.warn('Skipped "'.concat(n,'" because an invalid file extension was provided.')),o=!1),o})).map((function(e){var t,n,r,o=S(e,2),i=o[0],a=o[1];return{accept:(t={},n=i,r=a,n in t?Object.defineProperty(t,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[n]=r,t)}})):e}function Y(e){if(L(e))return Object.entries(e).reduce((function(e,t){var n=S(t,2),r=n[0],o=n[1];return[].concat(F(e),[r],F(o))}),[]).filter((function(e){return X(e)||Z(e)})).join(",")}function V(e){return e instanceof DOMException&&("AbortError"===e.name||e.code===e.ABORT_ERR)}function Q(e){return e instanceof DOMException&&("SecurityError"===e.name||e.code===e.SECURITY_ERR)}function X(e){return"audio/*"===e||"video/*"===e||"image/*"===e||"text/*"===e||/\w+\/[-+.\w]+/g.test(e)}function Z(e){return/^.*\.[\w]+$/.test(e)}var ee=["children"],te=["open"],ne=["refKey","role","onKeyDown","onFocus","onBlur","onClick","onDragEnter","onDragOver","onDragLeave","onDrop"],re=["refKey","onChange","onClick"];function oe(e){return function(e){if(Array.isArray(e))return ce(e)}(e)||function(e){if("undefined"!==typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||ae(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ie(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null==n)return;var r,o,i=[],a=!0,c=!1;try{for(n=n.call(e);!(a=(r=n.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(u){c=!0,o=u}finally{try{a||null==n.return||n.return()}finally{if(c)throw o}}return i}(e,t)||ae(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function ae(e,t){if(e){if("string"===typeof e)return ce(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?ce(e,t):void 0}}function ce(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function ue(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function le(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?ue(Object(n),!0).forEach((function(t){se(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):ue(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function se(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function fe(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var pe=Object(r.forwardRef)((function(e,t){var n=e.children,i=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=le(le({},de),e),n=t.accept,o=t.disabled,i=t.getFilesFromEvent,a=t.maxSize,c=t.minSize,u=t.multiple,l=t.maxFiles,s=t.onDragEnter,f=t.onDragLeave,p=t.onDragOver,d=t.onDrop,v=t.onDropAccepted,m=t.onDropRejected,b=t.onFileDialogCancel,y=t.onFileDialogOpen,g=t.useFsAccessApi,h=t.autoFocus,w=t.preventDropOnDocument,O=t.noClick,j=t.noKeyboard,D=t.noDrag,x=t.noDragEventsBubbling,A=t.onError,E=t.validator,k=Object(r.useMemo)((function(){return Y(n)}),[n]),F=Object(r.useMemo)((function(){return J(n)}),[n]),S=Object(r.useMemo)((function(){return"function"===typeof y?y:be}),[y]),P=Object(r.useMemo)((function(){return"function"===typeof b?b:be}),[b]),C=Object(r.useRef)(null),z=Object(r.useRef)(null),R=Object(r.useReducer)(me,ve),T=ie(R,2),L=T[0],$=T[1],H=L.isFocused,X=L.isFileDialogActive,Z=Object(r.useRef)("undefined"!==typeof window&&window.isSecureContext&&g&&N()),ee=function(){!Z.current&&X&&setTimeout((function(){z.current&&(z.current.files.length||($({type:"closeDialog"}),P()))}),300)};Object(r.useEffect)((function(){return window.addEventListener("focus",ee,!1),function(){window.removeEventListener("focus",ee,!1)}}),[z,X,P,Z]);var te=Object(r.useRef)([]),ae=function(e){C.current&&C.current.contains(e.target)||(e.preventDefault(),te.current=[])};Object(r.useEffect)((function(){return w&&(document.addEventListener("dragover",W,!1),document.addEventListener("drop",ae,!1)),function(){w&&(document.removeEventListener("dragover",W),document.removeEventListener("drop",ae))}}),[C,w]),Object(r.useEffect)((function(){return!o&&h&&C.current&&C.current.focus(),function(){}}),[C,h,o]);var ce=Object(r.useCallback)((function(e){A?A(e):console.error(e)}),[A]),ue=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),Fe(e),te.current=[].concat(oe(te.current),[e.target]),U(e)&&Promise.resolve(i(e)).then((function(t){if(!K(e)||x){var n=t.length,r=n>0&&B({files:t,accept:k,minSize:c,maxSize:a,multiple:u,maxFiles:l,validator:E});$({isDragAccept:r,isDragReject:n>0&&!r,isDragActive:!0,type:"setDraggedFiles"}),s&&s(e)}})).catch((function(e){return ce(e)}))}),[i,s,ce,x,k,c,a,u,l,E]),pe=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),Fe(e);var t=U(e);if(t&&e.dataTransfer)try{e.dataTransfer.dropEffect="copy"}catch(n){}return t&&p&&p(e),!1}),[p,x]),ye=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),Fe(e);var t=te.current.filter((function(e){return C.current&&C.current.contains(e)})),n=t.indexOf(e.target);-1!==n&&t.splice(n,1),te.current=t,t.length>0||($({type:"setDraggedFiles",isDragActive:!1,isDragAccept:!1,isDragReject:!1}),U(e)&&f&&f(e))}),[C,f,x]),ge=Object(r.useCallback)((function(e,t){var n=[],r=[];e.forEach((function(e){var t=ie(_(e,k),2),o=t[0],i=t[1],u=ie(M(e,c,a),2),l=u[0],s=u[1],f=E?E(e):null;if(o&&l&&!f)n.push(e);else{var p=[i,s];f&&(p=p.concat(f)),r.push({file:e,errors:p.filter((function(e){return e}))})}})),(!u&&n.length>1||u&&l>=1&&n.length>l)&&(n.forEach((function(e){r.push({file:e,errors:[I]})})),n.splice(0)),$({acceptedFiles:n,fileRejections:r,type:"setFiles"}),d&&d(n,r,t),r.length>0&&m&&m(r,t),n.length>0&&v&&v(n,t)}),[$,u,k,c,a,l,d,v,m,E]),he=Object(r.useCallback)((function(e){e.preventDefault(),e.persist(),Fe(e),te.current=[],U(e)&&Promise.resolve(i(e)).then((function(t){K(e)&&!x||ge(t,e)})).catch((function(e){return ce(e)})),$({type:"reset"})}),[i,ge,ce,x]),we=Object(r.useCallback)((function(){if(Z.current){$({type:"openDialog"}),S();var e={multiple:u,types:F};window.showOpenFilePicker(e).then((function(e){return i(e)})).then((function(e){ge(e,null),$({type:"closeDialog"})})).catch((function(e){V(e)?(P(e),$({type:"closeDialog"})):Q(e)?(Z.current=!1,z.current?(z.current.value=null,z.current.click()):ce(new Error("Cannot open the file picker because the https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API is not supported and no <input> was provided."))):ce(e)}))}else z.current&&($({type:"openDialog"}),S(),z.current.value=null,z.current.click())}),[$,S,P,g,ge,ce,F,u]),Oe=Object(r.useCallback)((function(e){C.current&&C.current.isEqualNode(e.target)&&(" "!==e.key&&"Enter"!==e.key&&32!==e.keyCode&&13!==e.keyCode||(e.preventDefault(),we()))}),[C,we]),je=Object(r.useCallback)((function(){$({type:"focus"})}),[]),De=Object(r.useCallback)((function(){$({type:"blur"})}),[]),xe=Object(r.useCallback)((function(){O||(q()?setTimeout(we,0):we())}),[O,we]),Ae=function(e){return o?null:e},Ee=function(e){return j?null:Ae(e)},ke=function(e){return D?null:Ae(e)},Fe=function(e){x&&e.stopPropagation()},Se=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,r=e.role,i=e.onKeyDown,a=e.onFocus,c=e.onBlur,u=e.onClick,l=e.onDragEnter,s=e.onDragOver,f=e.onDragLeave,p=e.onDrop,d=fe(e,ne);return le(le(se({onKeyDown:Ee(G(i,Oe)),onFocus:Ee(G(a,je)),onBlur:Ee(G(c,De)),onClick:Ae(G(u,xe)),onDragEnter:ke(G(l,ue)),onDragOver:ke(G(s,pe)),onDragLeave:ke(G(f,ye)),onDrop:ke(G(p,he)),role:"string"===typeof r&&""!==r?r:"presentation"},n,C),o||j?{}:{tabIndex:0}),d)}}),[C,Oe,je,De,xe,ue,pe,ye,he,j,D,o]),Pe=Object(r.useCallback)((function(e){e.stopPropagation()}),[]),Ce=Object(r.useMemo)((function(){return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.refKey,n=void 0===t?"ref":t,r=e.onChange,o=e.onClick,i=fe(e,re),a=se({accept:k,multiple:u,type:"file",style:{display:"none"},onChange:Ae(G(r,he)),onClick:Ae(G(o,Pe)),tabIndex:-1},n,z);return le(le({},a),i)}}),[z,n,u,he,o]);return le(le({},L),{},{isFocused:H&&!o,getRootProps:Se,getInputProps:Ce,rootRef:C,inputRef:z,open:Ae(we)})}(fe(e,ee)),a=i.open,c=fe(i,te);return Object(r.useImperativeHandle)(t,(function(){return{open:a}}),[a]),o.a.createElement(r.Fragment,null,n(le(le({},c),{},{open:a})))}));pe.displayName="Dropzone";var de={disabled:!1,getFilesFromEvent:function(e){return c(this,void 0,void 0,(function(){return u(this,(function(t){return v(e)&&v(e.dataTransfer)?[2,y(e.dataTransfer,e.type)]:function(e){return v(e)&&v(e.target)}(e)?[2,m(e)]:Array.isArray(e)&&e.every((function(e){return"getFile"in e&&"function"===typeof e.getFile}))?[2,b(e)]:[2,[]]}))}))},maxSize:1/0,minSize:0,multiple:!0,maxFiles:0,preventDropOnDocument:!0,noClick:!1,noKeyboard:!1,noDrag:!1,noDragEventsBubbling:!1,validator:null,useFsAccessApi:!0,autoFocus:!1};pe.defaultProps=de,pe.propTypes={children:a.a.func,accept:a.a.objectOf(a.a.arrayOf(a.a.string)),multiple:a.a.bool,preventDropOnDocument:a.a.bool,noClick:a.a.bool,noKeyboard:a.a.bool,noDrag:a.a.bool,noDragEventsBubbling:a.a.bool,minSize:a.a.number,maxSize:a.a.number,maxFiles:a.a.number,disabled:a.a.bool,getFilesFromEvent:a.a.func,onFileDialogCancel:a.a.func,onFileDialogOpen:a.a.func,useFsAccessApi:a.a.bool,autoFocus:a.a.bool,onDragEnter:a.a.func,onDragLeave:a.a.func,onDragOver:a.a.func,onDrop:a.a.func,onDropAccepted:a.a.func,onDropRejected:a.a.func,onError:a.a.func,validator:a.a.func};t.a=pe;var ve={isFocused:!1,isFileDialogActive:!1,isDragActive:!1,isDragAccept:!1,isDragReject:!1,acceptedFiles:[],fileRejections:[]};function me(e,t){switch(t.type){case"focus":return le(le({},e),{},{isFocused:!0});case"blur":return le(le({},e),{},{isFocused:!1});case"openDialog":return le(le({},ve),{},{isFileDialogActive:!0});case"closeDialog":return le(le({},e),{},{isFileDialogActive:!1});case"setDraggedFiles":return le(le({},e),{},{isDragActive:t.isDragActive,isDragAccept:t.isDragAccept,isDragReject:t.isDragReject});case"setFiles":return le(le({},e),{},{acceptedFiles:t.acceptedFiles,fileRejections:t.fileRejections});case"reset":return le({},ve);default:return e}}function be(){}}}]);
//# sourceMappingURL=32.bca6b2de.chunk.js.map