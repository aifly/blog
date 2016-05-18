!function(e){function t(r){if(n[r])return n[r].exports;var i=n[r]={exports:{},id:r,loaded:!1};return e[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(4);var a=n(2),o={viewWidth:document.documentElement.clientWidth,viewHeight:document.documentElement.clientHeight,canvas:(0,a._$)("#clock"),main:(0,a._$)("#fly-main")},s=(window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)},{init:function(){this.setSize(),this.initCanvasEffect(o.canvas)},setSize:function(){var e=arguments.length<=0||void 0===arguments[0]?o.viewWidth:arguments[0],t=arguments.length<=1||void 0===arguments[1]?o.viewHeight:arguments[1];o.canvas.width=e,o.canvas.height=t},initSecCanvas:function(e){var t=e.getContext("2d"),n=document.createElement("canvas"),r=n.getContext("2d");return n.width=300,n.height=300,{context:t,secCanvas:n,secContext:r}},fillTime:function(e,t,n,r){return t.clearRect(0,0,n,r),t.fillText(e,0,0),this.getImgData(t,n,r)},getImgData:function(e,t,n){for(var r=e.getImageData(0,0,t,n),i=10,a=[],o=0,s=r.width;s>o;o+=i)for(var l=0,u=r.height;u>l;l+=i){var c=4*(o+l*t);r.data[c+3]>128&&a.push({x:o,y:l,r:r.data[c],g:r.data[c+1],b:r.data[c+2],a:r.data[c+3]})}return a},initCanvasEffect:function(e){var t=this,n=this.initSecCanvas(e),s=(n.context,n.secCanvas),l=n.secContext;l.textBaseline="top",l.font="250px Georgia",this.ballArr=[],this.moveBallArr=[],window.arr=this.moveBallArr;var u=l.createLinearGradient(0,0,s.width,s.height);u.addColorStop(0,"#e2b722"),u.addColorStop(1,"#8dd003"),l.fillStyle=u;var c=s.width,d=s.height,f=(o.viewWidth>>1,o.viewHeight>>1,o.viewWidth-c>>1,o.viewHeight-d>>1),h=new createjs.Stage(e),p=["#f28613","#a3590a","#774c1e","#d2a419","#d5ba67","#f0b708","#fefba1","#aea801"],v=function(){function e(t){r(this,e);var n=t.x,i=t.y,o=t.r,s=t.g,l=t.b,u=t.a,c=t.type,d=this;d.x=n,d.y=i,d.r=o,d.g=s,d.b=l,d.a=u,d.type=c,d.ripe=!1,d.speedY=-a.utilMethods.r(30,40,"round"),d.speedX=-a.utilMethods.r(2,6,"round"),d.create()}return i(e,[{key:"create",value:function(){var e=this,t=new createjs.Shape,n=p[a.utilMethods.r(0,p.length,"floor")];t.graphics.beginFill(n).drawCircle(0,0,4),t.x=e.x,t.y=e.y,h.addChild(t),e.shape=t}}]),e}();this.Ball=v;var g=(o.viewWidth-1200)/2;this.render(l,c,d,g,f),setInterval(function(){t.ballArr.forEach(function(e,n){e.ripe||"seconds"!==e.type||t.moveBallArr.push(e)});var e=t.renderSec("seconds",l,c,d,g,f);e.seconds,e.mins},1e3),createjs.Ticker.on("tick",function(){t.moveBallArr.forEach(function(e,n){e.speedY+=5;var r=e.shape.y+e.speedY;r>o.viewHeight-8&&(r=o.viewHeight-8,e.speedY*=-.76),Math.abs(e.speedY)<4&&r>=o.viewHeight-f&&(e.speedY=0),e.shape.scaleX=2,e.shape.scaleY=2,e.shape.x+=e.speedX,e.shape.y=r,e.shape.x<=0&&!function(){h.removeChild(e.shape),e=null;var r=t.moveBallArr.splice(n,1)[0];t.ballArr.forEach(function(e,n){e===r&&t.ballArr.splice(n,1)})}()}),h.update()})},startMove:function(e){},fillZero:function(e){return 10>e?"0"+e:e},render:function(e,t,n,r,i){var a=150,o=new Date,s=o.getHours(),l=o.getMinutes(),u=o.getSeconds();s=this.fillZero(s),l=this.fillZero(l),u=this.fillZero(u),this.update(s,"hour",e,t,n,r,i),this.update(":","0",e,t,n,r+t,i),this.update(l,"mins",e,t,n,r+a+t,i),this.update(":","0",e,t,n,r+2*t+a,i),this.update(u,"seconds",e,t,n,r+2*(a+t),i)},renderSec:function(e,t,n,r,i,a){var o=150,s=new Date,l=s.getHours(),u=s.getMinutes(),c=s.getSeconds();l=this.fillZero(l),u=this.fillZero(u),c=this.fillZero(c);var d=c;switch(e){case"hours":d=l;break;case"mins":d=u;break;case"seconds":d=c}return this.update(d,e,t,n,r,i+2*(o+n),a),{seconds:c,mins:u}},update:function(e,t,n,r,i,a,o){var s=this;this.dots=this.fillTime(e,n,r,i),this.dots.forEach(function(e,n){s.ballArr.push(new s.Ball({x:e.x+a,y:o/1.5+e.y,r:e.r,g:e.g,b:e.b,a:e.a,type:t}))})}});s.init()},function(e,t){"use strict";e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var n=this[t];n[2]?e.push("@media "+n[2]+"{"+n[1]+"}"):e.push(n[1])}return e.join("")},e.i=function(t,n){"string"==typeof t&&(t=[[null,t,""]]);for(var r={},i=0;i<this.length;i++){var a=this[i][0];"number"==typeof a&&(r[a]=!0)}for(i=0;i<t.length;i++){var o=t[i];"number"==typeof o[0]&&r[o[0]]||(n&&!o[2]?o[2]=n:n&&(o[2]="("+o[2]+") and ("+n+")"),e.push(o))}},e}},function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={getGuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0,n="x"==e?t:3&t|8;return n.toString(16)})},r:function(e,t,n){return n?Math[n](e+Math.random()*(t-e)):e+Math.random()*(t-e)},loading:function(e,t,n){function r(){if(o!==i){var s=new Image;s.onload=s.onerror=function(){a++,i-1>o?(o++,r(),t&&t(o/(i-1),s.src)):n&&n(s.src)},s.src=e[o]}}var i=e.length,a=0,o=0;r()},getQueryString:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)","i"),n=window.location.search.substr(1).match(t);return null!=n?unescape(n[2]):null},getStyle:function(e){return window.getComputedStyle?window.getComputedStyle(e,null):e.currentStyle},hasClass:function(e,t){return Array.from(e.classList).indexOf(t)>-1},removeClass:function(e,t){e.length?e.forEach(function(e){e.classList.remove(t)}):e.classList.remove(t)},addClass:function(e,t){e.length?e.forEach(function(e){e.classList.add(t)}):e.classList.add(t)},index:function(e,t,n){var t=t||e.parentNode,r=-1,n=n||"*";return Array.from(t.querySelectorAll(n)).forEach(function(t,n){t===e&&(r=n)}),r},ajax:function(e,t){var n=this,r=null;window.XMLHttpRequest&&(r=new XMLHttpRequest),null!=r&&(r.onreadystatechange=function(){n.stateChange(r,t)},r.overrideMimeType&&r.overrideMimeType("text/html"),r.open("GET",e,!0),r.send(null))},stateChange:function(e,t){4==e.readyState&&(200==e.status?t&&t(e.responseText):alert("Problem retrieving XML data"))}};Array.from||(Array.from=function(e){return Array.prototype.slice.call(e)});var r=function(e,t){return(t||document).querySelector(e)},i=function(e,t){return t=t||document,[].slice.call(t.querySelectorAll(e))};t["default"]={utilMethods:n,_$:r,$$:i},e.exports=t["default"]},function(e,t,n){function r(e,t){for(var n=0;n<e.length;n++){var r=e[n],i=h[r.id];if(i){i.refs++;for(var a=0;a<i.parts.length;a++)i.parts[a](r.parts[a]);for(;a<r.parts.length;a++)i.parts.push(u(r.parts[a],t))}else{for(var o=[],a=0;a<r.parts.length;a++)o.push(u(r.parts[a],t));h[r.id]={id:r.id,refs:1,parts:o}}}}function i(e){for(var t=[],n={},r=0;r<e.length;r++){var i=e[r],a=i[0],o=i[1],s=i[2],l=i[3],u={css:o,media:s,sourceMap:l};n[a]?n[a].parts.push(u):t.push(n[a]={id:a,parts:[u]})}return t}function a(e,t){var n=g(),r=y[y.length-1];if("top"===e.insertAt)r?r.nextSibling?n.insertBefore(t,r.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),y.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(t)}}function o(e){e.parentNode.removeChild(e);var t=y.indexOf(e);t>=0&&y.splice(t,1)}function s(e){var t=document.createElement("style");return t.type="text/css",a(e,t),t}function l(e){var t=document.createElement("link");return t.rel="stylesheet",a(e,t),t}function u(e,t){var n,r,i;if(t.singleton){var a=x++;n=m||(m=s(t)),r=c.bind(null,n,a,!1),i=c.bind(null,n,a,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=l(t),r=f.bind(null,n),i=function(){o(n),n.href&&URL.revokeObjectURL(n.href)}):(n=s(t),r=d.bind(null,n),i=function(){o(n)});return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}function c(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=w(t,i);else{var a=document.createTextNode(i),o=e.childNodes;o[t]&&e.removeChild(o[t]),o.length?e.insertBefore(a,o[t]):e.appendChild(a)}}function d(e,t){var n=t.css,r=t.media;if(r&&e.setAttribute("media",r),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function f(e,t){var n=t.css,r=t.sourceMap;r&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([n],{type:"text/css"}),a=e.href;e.href=URL.createObjectURL(i),a&&URL.revokeObjectURL(a)}var h={},p=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},v=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),g=p(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,x=0,y=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=v()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var n=i(e);return r(n,t),function(e){for(var a=[],o=0;o<n.length;o++){var s=n[o],l=h[s.id];l.refs--,a.push(l)}if(e){var u=i(e);r(u,t)}for(var o=0;o<a.length;o++){var l=a[o];if(0===l.refs){for(var c=0;c<l.parts.length;c++)l.parts[c]();delete h[l.id]}}}};var w=function(){var e=[];return function(t,n){return e[t]=n,e.filter(Boolean).join("\n")}}()},function(e,t,n){"use strict";var r=n(7);"string"==typeof r&&(r=[[e.id,r,""]]);n(3)(r,{});r.locals&&(e.exports=r.locals)},,,function(e,t,n){t=e.exports=n(1)(),t.push([e.id,"body,canvas,dd,div,dl,dt,figure,footer,h1,h2,h3,h4,header,html,li,ol,p,section,ul,video{padding:0;margin:0}a{text-decoration:none}li{list-style:none}body,html{height:100%}img{border:none;vertical-align:top;width:100%;height:auto}input,textarea{outline:none}body{font-family:Microsoft Yahei,Tahoma,Helvetica,Arial,sans-serif;font-size:14px;height:100%;overflow:hidden;background:#2e2e2e}#fly-main canvas{position:absolute;left:0;top:0}",""])}]);