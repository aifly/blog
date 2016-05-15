/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 created by fly on 2016/5/10 0010
	 */
	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	__webpack_require__(1);

	var _staticImages1Png = __webpack_require__(5);

	var _staticImages1Png2 = _interopRequireDefault(_staticImages1Png);

	var _utilMethodsEs6 = __webpack_require__(6);

	var _staticLibsTween = __webpack_require__(7);

	var data = {
	    main: (0, _utilMethodsEs6._$)('#fly-main'),
	    navIco: (0, _utilMethodsEs6._$)('.fly-nav-ico'),
	    menu: (0, _utilMethodsEs6._$)('.fly-nav'),
	    mask: (0, _utilMethodsEs6._$)('#fly-main .fly-mask'),
	    page1: (0, _utilMethodsEs6._$)('#fly-page1'),
	    border: (0, _utilMethodsEs6._$)('#fly-main .fly-border'),
	    canvas: document.getElementById('fly-html5'),
	    viewWidth: document.documentElement.clientWidth,
	    viewHeight: document.documentElement.clientHeight
	};

	var util = {
	    init: function init() {
	        this.setBg();
	        this.bindEvent();
	        this.canvasEffect(data.canvas);
	    },

	    setTransformOrigin: function setTransformOrigin(obj, x, y, z) {
	        obj.style.transformOrigin = x + 'px ' + y + 'px ' + (z || 0) + 'px';
	        obj.style.WebkitTransformOrigin = x + 'px ' + y + 'px ' + (z || 0) + 'px';
	    },
	    setTransform: function setTransform(obj, x, y, scale) {
	        obj.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + y + 'deg)';
	        obj.style.WebkitTransform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + y + 'deg)';
	    },

	    printText: function printText(text, str) {
	        var arr = [];
	        for (var i = 0; i < str.length; i++) {
	            arr[i] = str[i];
	        }
	        var p = document.createElement("p");
	        text.appendChild(p);
	        var index = 0;

	        var obj = setInterval(function () {

	            if (index < arr.length) {
	                var text = '<span>' + arr[index] + '</span>';
	                p.innerHTML += text;
	                var width = 0;
	                (0, _utilMethodsEs6.$$)('span', p).forEach(function (item) {
	                    width += item.offsetWidth;
	                });
	                p.style.width = width + 'px';

	                data.border.style.left = p.offsetLeft + width + "px";
	                index++;
	            } else {
	                index = 0;
	                p.innerHTML = '';
	            }
	        }, 400);
	    },

	    canvasEffect: function canvasEffect(canvas) {
	        createjs.MotionGuidePlugin.install(createjs.Tween);

	        canvas.width = data.viewWidth;
	        canvas.height = data.viewHeight;

	        var cacheCanvas = document.createElement('canvas'),
	            context = cacheCanvas.getContext('2d');
	        cacheCanvas.width = data.viewWidth;
	        cacheCanvas.height = data.viewHeight;
	        cacheCanvas.style.border = '1px solid red';

	        context.font = "250px Georgia";
	        var x = (data.viewWidth - 900) / 2,
	            y = (data.viewHeight - 300) / 2,
	            w = (data.viewWidth - 900) / 2 + 800,
	            h = data.viewHeight / 1.5 + 300;

	        var color = context.createLinearGradient(x, y, w, h);
	        color.addColorStop(0, "#e2b722");
	        color.addColorStop(1, "#8dd003");
	        context.fillStyle = color;

	        context.textBaseline = 'top';
	        context.fillText('HTML5', x, y);

	        // data.page1.appendChild(cacheCanvas);

	        var imgData = context.getImageData(x, y, 900, 300);
	        //context2 = canvas.getContext('2d');
	        //context2.putImageData(imgData, x, y);

	        var dots = [],
	            imgDataW = imgData.width,
	            imgDataH = imgData.height,
	            gap = 8;
	        for (var i = 0; i < imgDataW; i += gap) {
	            for (var j = 0; j < imgDataH; j += gap) {
	                var a = (i + j * imgDataW) * 4;
	                if (imgData.data[a + 3] > 128) {
	                    dots.push({
	                        x: i,
	                        y: j,
	                        r: imgData.data[a],
	                        g: imgData.data[a + 1],
	                        b: imgData.data[a + 2],
	                        a: imgData.data[a + 3]
	                    });
	                }
	            }
	        }

	        var stage = new createjs.Stage(canvas);

	        var self = this;

	        var Dot = (function () {
	            function Dot(args) {
	                _classCallCheck(this, Dot);

	                var x = args.x;
	                var y = args.y;
	                var r = args.r;
	                var g = args.g;
	                var b = args.b;
	                var a = args.a;
	                var type = args.type;

	                this.type = type || 'normal';
	                this.life = _utilMethodsEs6.utilMethods.r(100, 300);
	                this.speedX = _utilMethodsEs6.utilMethods.r(-3, 3);
	                this.speedY = _utilMethodsEs6.utilMethods.r(-3, 3);
	                this.duration = _utilMethodsEs6.utilMethods.r(1000, 2000);
	                this.directionX = _utilMethodsEs6.utilMethods.r(0, 1) > .5;
	                this.directionY = _utilMethodsEs6.utilMethods.r(0, 1) > .5;
	                this.startTime = +new Date();
	                this.wait = _utilMethodsEs6.utilMethods.r(0, 100);
	                this.waitInow = 0;
	                this.iNow = 0;

	                this.x = x;
	                this.y = y;
	                this.nextPoint = { x: _utilMethodsEs6.utilMethods.r(-60, 60), y: _utilMethodsEs6.utilMethods.r(-50, 50) };
	                this.r = r;
	                this.g = g;
	                this.b = b;
	                this.a = a;
	                this.create();
	            }

	            _createClass(Dot, [{
	                key: 'create',
	                value: function create() {
	                    var circle = new createjs.Shape(),
	                        dot = this;
	                    this.shape = circle;
	                    circle.graphics.beginFill('rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')').drawPolyStar(dot.x, dot.y, 3, 5);
	                    container.addChild(circle);

	                    if (this.type === 'normal' && false) {

	                        var path = [self.rx(), self.ry(), self.rx(), self.ry(), self.rx(), self.ry()];

	                        createjs.Tween.get(this.shape, { loop: true }).to({ guide: { path: path, start: 0, end: 1 } }, this.duration).wait(this.wait).to({ guide: { path: path, start: 1, end: 0 } }, this.duration);
	                    }
	                }
	            }, {
	                key: 'move',
	                value: function move() {
	                    var s = this;

	                    if (s.type === 'normal') {
	                        //

	                        s.iNow += 1;
	                        //

	                        if (s.iNow >= s.life) {
	                            s.iNow = 0;

	                            createjs.Tween.get(s.shape).to({
	                                x: s.nextPoint.x,
	                                y: s.nextPoint.y
	                            }, s.duration, createjs.Ease.quintOut).call(function () {
	                                s.nextPoint = { x: _utilMethodsEs6.utilMethods.r(-100, 100), y: _utilMethodsEs6.utilMethods.r(-100, 100) };
	                                s.duration = _utilMethodsEs6.utilMethods.r(1000, 2000);
	                                s.life = _utilMethodsEs6.utilMethods.r(80, 120);
	                            });
	                        }
	                    } else {}
	                }
	            }]);

	            return Dot;
	        })();

	        var container = new createjs.Container().set({ x: x, y: y }),
	            circleArr = [];

	        dots.forEach(function (dot) {
	            circleArr.push(new Dot({ x: dot.x, y: dot.y, r: dot.r, g: dot.g, b: dot.b, a: dot.a, type: 'word' }));
	        });

	        for (var i = 0; i < 440; i++) {
	            var dot = dots[Math.floor(_utilMethodsEs6.utilMethods.r(0, dots.length - 1))];
	            circleArr.push(new Dot({
	                x: _utilMethodsEs6.utilMethods.r(-x, data.viewWidth),
	                y: _utilMethodsEs6.utilMethods.r(-y, data.viewHeight),
	                r: dot.r,
	                g: dot.g,
	                b: dot.b,
	                a: .7,
	                type: 'normal'
	            }));
	        }

	        stage.addChild(container);

	        createjs.Ticker.on("tick", function () {
	            circleArr.forEach(function (c) {
	                return c.move();
	            });
	            stage.update();
	        });

	        /*
	         */
	    },
	    rx: function rx() {
	        return Math.random() * 1000 + 10;
	    },
	    ry: function ry() {
	        return Math.random() * 300 + 10;
	    },
	    rc: function rc() {
	        return Math.round(Math.random() * 0xED + 0x12).toString(16);
	    },
	    bindEvent: function bindEvent() {
	        var _this = this;

	        this.printText((0, _utilMethodsEs6._$)('.fly-js'), 'javascript');

	        var f = function f() {
	            data.mask.classList.toggle('show');
	            data.main.classList.toggle('active');
	            data.menu.classList.toggle('active');
	        };

	        data.navIco.addEventListener('mousedown', function () {
	            _this.toggleMenu(true);
	        });
	        data.navIco.addEventListener('mouseup', function () {
	            _this.toggleMenu(false);

	            _utilMethodsEs6.utilMethods.addClass((0, _utilMethodsEs6.$$)('li', data.menu), 'active');

	            f();
	        });

	        data.mask.addEventListener('click', function () {
	            f();
	            _utilMethodsEs6.utilMethods.removeClass((0, _utilMethodsEs6.$$)('li', data.menu), 'active');
	        });

	        data.navIco.addEventListener('mouseout', function () {
	            _this.toggleMenu(false);
	        });

	        data.page1.mousemove = function (e) {
	            var disX = e.pageX - _this.x;
	            var disY = e.pageY - _this.y;

	            _this.setTransform(data.main, -disY / 10, disX / 22, 1);
	        };

	        data.page1.mouseup = function (e) {
	            _this.setTransform(data.main, 0, 0, 1);
	            _this.x = _this.y = 0;

	            data.main.style = null;
	            document.removeEventListener('mousemove', data.page1.mousemove);
	            document.removeEventListener('mouseup', document.mouseup);
	        };

	        data.page1.addEventListener('mousedown', function (e) {

	            data.main.style = null;
	            e.preventDefault();
	            _this.x = e.pageX;
	            _this.y = e.pageY;
	            _this.setTransformOrigin(data.main, data.viewWidth / 2, data.viewHeight / 2, 0);

	            document.addEventListener('mousemove', data.page1.mousemove);
	            document.addEventListener('mouseup', data.page1.mouseup);

	            return false;
	        });
	    },

	    toggleMenu: function toggleMenu(toggle) {
	        if (toggle) {
	            data.navIco.classList.add('shadow');
	        } else {
	            data.navIco.classList.remove('shadow');
	        }
	    },
	    setBg: function setBg() {
	        var arr = [data.page1];
	        [_staticImages1Png2['default']].forEach(function (b, i) {
	            arr[i].style.background = 'url(./static/js/' + b + ') no-repeat center center';
	            arr[i].style.backgroundSize = 'cover';
	        });
	    }
	};

	util.init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	'use strict';

	var content = __webpack_require__(2);
	if (typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if (content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if (false) {
		// When the styles change, update the <style> tags
		if (!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./index.css", function () {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./index.css");
				if (typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function () {
			update();
		});
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "html, body, div, p, ul, li, ol, dl, dt, dd, header, footer, video, h1, h2, h3, h4, canvas, section, figure {\r\n  padding: 0;\r\n  margin: 0; }\r\n\r\na {\r\n  text-decoration: none; }\r\n\r\nli {\r\n  list-style: none; }\r\n\r\nhtml, body {\r\n  height: 100%; }\r\n\r\nimg {\r\n  border: none;\r\n  vertical-align: top;\r\n  width: 100%;\r\n  height: auto; }\r\n\r\ninput, textarea {\r\n  outline: none; }\r\n\r\nbody {\r\n  font-family: 'Microsoft Yahei', Tahoma, Helvetica, Arial, sans-serif;\r\n  font-size: 14px;\r\n  height: 100%;\r\n  overflow: hidden;\r\n  -webkit-transform-style: preserve-3d;\r\n  transform-style: preserve-3d;\r\n  perspective: 300px;\r\n  -webkit-perspective: 300px;\r\n  background: #2e2e2e; }\r\n\r\n#fly-main {\r\n  width: 100vw;\r\n  height: 100vh;\r\n  position: relative;\r\n  z-index: 1;\r\n  -webkit-transition: -webkit-transform 0.3s;\r\n  transition: transform 0.3s;\r\n  -webkit-transition-timing-function: cubic-bezier(0, 0.85, 0.29, 0.95);\r\n  transition-timing-function: cubic-bezier(0, 0.85, 0.29, 0.95);\r\n  -webkit-transform-origin: right;\r\n  transform-origin: right; }\r\n  #fly-main .fly-page {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 1; }\r\n@keyframes typing {\r\n  from {\r\n    width: 0; } }\r\n@keyframes caret {\r\n  50% {\r\n    border-right-color: transparent; } }\r\n    #fly-main .fly-page .fly-js {\r\n      color: #fff;\r\n      font-family: woodcutter;\r\n      width: 680px;\r\n      /* animation: typing 5s  steps(10, end) infinite,\r\n       caret .5s step-end infinite alternate;*/\r\n      display: block;\r\n      margin: 100px auto;\r\n      font-size: 150px;\r\n      font-weight: normal;\r\n      text-align: center;\r\n      position: relative; }\r\n      #fly-main .fly-page .fly-js p {\r\n        margin: 0 auto;\r\n        text-align: center; }\r\n      #fly-main .fly-page .fly-js .fly-border {\r\n        position: absolute;\r\n        left: 0;\r\n        top: 0;\r\n        width: 0;\r\n        height: 100%;\r\n        border-right: 4px solid #fff;\r\n        -webkit-animation: typing 0.4s linear infinite;\r\n        animation: typing 0.4s linear infinite; }\r\n    #fly-main .fly-page canvas {\r\n      position: absolute;\r\n      left: 0;\r\n      top: 0; }\r\n  #fly-main.active {\r\n    -webkit-transform: rotateY(-3deg) scale(1);\r\n    transform: rotateY(-3deg) scale(1);\r\n    -webkit-filter: blur(8px);\r\n    filter: blur(8px); }\r\n  #fly-main .fly-nav-ico {\r\n    flex-grow: 1;\r\n    width: 60px;\r\n    height: 60px;\r\n    cursor: pointer;\r\n    position: absolute;\r\n    z-index: 10000;\r\n    margin: 2vw;\r\n    -webkit-transform: rotate(180deg);\r\n    transform: rotate(180deg);\r\n    background: yellowgreen;\r\n    border-radius: 50%;\r\n    -webkit-transition: -webkit-transform 0.1s;\r\n    transition: transform 0.1s; }\r\n    #fly-main .fly-nav-ico.shadow {\r\n      box-shadow: 0 0 20px rgba(75, 132, 109, 0.5), 0 0 40px rgba(5, 138, 84, 0.5);\r\n      -webkit-transform: scale(0.9) rotate(180deg);\r\n      transform: scale(0.9) rotate(180deg); }\r\n    #fly-main .fly-nav-ico div {\r\n      width: 100%;\r\n      height: 58%;\r\n      position: absolute;\r\n      top: 50%;\r\n      -webkit-transform: translate3d(0, -67%, 0);\r\n      transform: translate3d(0, -67%, 0);\r\n      text-align: center;\r\n      padding-top: 5px;\r\n      box-sizing: border-box; }\r\n    #fly-main .fly-nav-ico span {\r\n      -webkit-transition: 0.2s;\r\n      transition: 0.2s;\r\n      margin: 7px auto;\r\n      width: 35px;\r\n      height: 3px;\r\n      background: #fff;\r\n      display: block;\r\n      border-radius: 3px; }\r\n  #fly-main .fly-mask {\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    z-index: 10000;\r\n    background: rgba(0, 0, 0, 0.5);\r\n    width: 100%;\r\n    height: 100%;\r\n    display: none; }\r\n    #fly-main .fly-mask.show {\r\n      display: block; }\r\n\r\n.fly-nav {\r\n  -webkit-transition-timing-function: cubic-bezier(0, 0.85, 0.29, 0.95);\r\n  transition-timing-function: cubic-bezier(0, 0.85, 0.29, 0.95);\r\n  -webkit-transition: -webkit-transform 0.3s;\r\n  transition: transform 0.3s;\r\n  -webkit-transform: translate3d(-14vw, 0, 0);\r\n  transform: translate3d(-14vw, 0, 0);\r\n  position: absolute;\r\n  left: 0;\r\n  top: 0;\r\n  width: 14vw;\r\n  z-index: 100;\r\n  height: 100vh;\r\n  background: #9cf39b;\r\n  color: #000;\r\n  -webkit-transform-origin: left;\r\n  transform-origin: left; }\r\n  .fly-nav.active {\r\n    -webkit-transition: -webkit-transform 0.2s;\r\n    transition: transform 0.2s;\r\n    -webkit-transform: translate3d(0, 0, 0);\r\n    transform: translate3d(0, 0, 0); }\r\n  .fly-nav ul {\r\n    overflow: hidden;\r\n    width: 100%; }\r\n    .fly-nav ul li {\r\n      height: 50px;\r\n      text-align: center;\r\n      line-height: 50px;\r\n      font-size: 1vw;\r\n      -webkit-transition: -webkit-transform 0.4s;\r\n      transition: transform 0.4s;\r\n      position: relative;\r\n      -webkit-transition-delay: 0.4s;\r\n      transition-delay: 0.4s; }\r\n      .fly-nav ul li :before {\r\n        content: '';\r\n        position: absolute;\r\n        left: 0;\r\n        bottom: 0;\r\n        width: 100%;\r\n        height: 1px;\r\n        background: -webkit-gradient(linear, left top, right top, from(rgba(204, 204, 204, 0.2)), color-stop(0.5, #cccccc), to(rgba(204, 204, 204, 0.2)));\r\n        background: -moz-linear-gradient(left, rgba(204, 204, 204, 0.2), #cccccc 50%, rgba(204, 204, 204, 0.2));\r\n        background: -ms-linear-gradient(left, rgba(204, 204, 204, 0.2), #cccccc 50%, rgba(204, 204, 204, 0.2)); }\r\n      .fly-nav ul li:nth-of-type(2n) {\r\n        -webkit-transform: translate3d(-44vw, 0, 0);\r\n        transform: translate3d(-44vw, 0, 0); }\r\n      .fly-nav ul li:nth-of-type(2n+1) {\r\n        -webkit-transform: translate3d(44vw, 0, 0);\r\n        transform: translate3d(44vw, 0, 0); }\r\n      .fly-nav ul li.active {\r\n        -webkit-transform: translate3d(0, 0, 0);\r\n        transform: translate3d(0, 0, 0); }\r\n      .fly-nav ul li:nth-of-type(1) {\r\n        -webkit-transition-delay: 100ms;\r\n        transition-delay: 100ms; }\r\n      .fly-nav ul li:nth-of-type(2) {\r\n        -webkit-transition-delay: 200ms;\r\n        transition-delay: 200ms; }\r\n      .fly-nav ul li:nth-of-type(3) {\r\n        -webkit-transition-delay: 300ms;\r\n        transition-delay: 300ms; }\r\n      .fly-nav ul li:nth-of-type(4) {\r\n        -webkit-transition-delay: 400ms;\r\n        transition-delay: 400ms; }\r\n      .fly-nav ul li:nth-of-type(5) {\r\n        -webkit-transition-delay: 500ms;\r\n        transition-delay: 500ms; }\r\n      .fly-nav ul li a {\r\n        color: #000;\r\n        display: block;\r\n        width: 100%;\r\n        height: 100%; }\r\n\r\n/*# sourceMappingURL=index.css.map */\r\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";

	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
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

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
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

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	module.exports = __webpack_require__.p + "2bce7c6aa1effd0098b032845b869201.png";

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 created by fly on 2016/5/10 0010
	 */
	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var utilMethods = {
	    getGuid: function getGuid() {
	        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	            var r = Math.random() * 16 | 0,
	                v = c == 'x' ? r : r & 0x3 | 0x8;
	            return v.toString(16);
	        });
	    },
	    r: function r(m, n) {
	        return m + Math.random() * (n - m);
	    },
	    loading: function loading(arr, fn, fnEnd) {
	        var len = arr.length;
	        var count = 0;
	        var i = 0;
	        loadimg();
	        function loadimg() {
	            if (i === len) {
	                return;
	            }
	            var img = new Image();
	            img.onload = img.onerror = function () {
	                count++;
	                if (i < len - 1) {
	                    i++;
	                    loadimg();
	                    fn && fn(i / (len - 1), img.src);
	                } else {
	                    fnEnd && fnEnd(img.src);
	                }
	            };
	            img.src = arr[i];
	        }
	    },
	    getQueryString: function getQueryString(name) {
	        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	        var r = window.location.search.substr(1).match(reg);
	        if (r != null) return unescape(r[2]);
	        return null;
	    },
	    getStyle: function getStyle(obj) {
	        return window.getComputedStyle ? window.getComputedStyle(obj, null) : obj.currentStyle;
	    },
	    hasClass: function hasClass(obj, className) {

	        return Array.from(obj.classList).indexOf(className) > -1;
	    },
	    removeClass: function removeClass(obj, className) {
	        if (obj.length) {
	            obj.forEach(function (o) {
	                o.classList.remove(className);
	            });
	        } else {
	            obj.classList.remove(className);
	        }
	    },
	    addClass: function addClass(obj, className) {
	        if (obj.length) {
	            obj.forEach(function (o) {
	                o.classList.add(className);
	            });
	        } else {
	            obj.classList.add(className);
	        }
	    },
	    index: function index(elems, parent, selector) {
	        var parent = parent || elems.parentNode,
	            cindex = -1,
	            selector = selector || "*";
	        Array.from(parent.querySelectorAll(selector)).forEach(function (item, i) {
	            "use strict";
	            if (item === elems) {
	                cindex = i;
	            }
	        });
	        return cindex;
	    },

	    ajax: function ajax(url, fn) {
	        var _this = this;

	        var xmlhttp = null;
	        if (window.XMLHttpRequest) {
	            // code for all new browsers
	            xmlhttp = new XMLHttpRequest();
	        }
	        if (xmlhttp != null) {
	            xmlhttp.onreadystatechange = function () {
	                _this.stateChange(xmlhttp, fn);
	            };
	            xmlhttp.overrideMimeType && xmlhttp.overrideMimeType('text/html'); //设置MiME类别
	            xmlhttp.open("GET", url, true);
	            xmlhttp.send(null);
	        }
	    },
	    stateChange: function stateChange(xmlhttp, fn) {
	        if (xmlhttp.readyState == 4) {
	            // 4 = "loaded"
	            if (xmlhttp.status == 200) {
	                // 200 = OK
	                fn && fn(xmlhttp.responseText);
	            } else {
	                alert("Problem retrieving XML data");
	            }
	        }
	    }
	};

	if (!Array.from) {
	    Array.from = function (c) {
	        return Array.prototype.slice.call(c);
	    };
	}

	var _$ = function _$(selector, parent) {
	    return (parent || document).querySelector(selector);
	};
	var $$ = function $$(selector, parent) {
	    parent = parent || document;
	    return [].slice.call(parent.querySelectorAll(selector));
	};

	exports['default'] = { utilMethods: utilMethods, _$: _$, $$: $$ };
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Created by Administrator on 2016/5/15.
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	    value: true
	});
	var Tween = {
	    //t : 当前时间   b : 初始值  c : 变化值   d : 总时间  //return : 当前的位置
	    linear: function linear(t, b, c, d) {
	        //匀速
	        return c * t / d + b;
	    },
	    easeIn: function easeIn(t, b, c, d) {
	        //加速曲线
	        return c * (t /= d) * t + b;
	    },
	    easeOut: function easeOut(t, b, c, d) {
	        //减速曲线
	        return -c * (t /= d) * (t - 2) + b;
	    },
	    easeBoth: function easeBoth(t, b, c, d) {
	        //加速减速曲线
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t + b;
	        }
	        return -c / 2 * (--t * (t - 2) - 1) + b;
	    },
	    easeInStrong: function easeInStrong(t, b, c, d) {
	        //加加速曲线
	        return c * (t /= d) * t * t * t + b;
	    },
	    easeOutStrong: function easeOutStrong(t, b, c, d) {
	        //减减速曲线
	        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
	    },
	    easeBothStrong: function easeBothStrong(t, b, c, d) {
	        //加加速减减速曲线
	        if ((t /= d / 2) < 1) {
	            return c / 2 * t * t * t * t + b;
	        }
	        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
	    },
	    elasticIn: function elasticIn(t, b, c, d, a, p) {
	        //正弦衰减曲线（弹动渐入）
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) == 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	    },
	    elasticOut: function elasticOut(t, b, c, d, a, p) {
	        //正弦增强曲线（弹动渐出）
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d) == 1) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * 0.3;
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
	    },
	    elasticBoth: function elasticBoth(t, b, c, d, a, p) {
	        if (t === 0) {
	            return b;
	        }
	        if ((t /= d / 2) == 2) {
	            return b + c;
	        }
	        if (!p) {
	            p = d * (0.3 * 1.5);
	        }
	        if (!a || a < Math.abs(c)) {
	            a = c;
	            var s = p / 4;
	        } else {
	            var s = p / (2 * Math.PI) * Math.asin(c / a);
	        }
	        if (t < 1) {
	            return -0.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
	        }
	        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * 0.5 + c + b;
	    },
	    backIn: function backIn(t, b, c, d, s) {
	        //回退加速（回退渐入）
	        if (typeof s == 'undefined') {
	            s = 1.70158;
	        }
	        return c * (t /= d) * t * ((s + 1) * t - s) + b;
	    },
	    backOut: function backOut(t, b, c, d, s) {
	        if (typeof s == 'undefined') {
	            s = 3.70158; //回缩的距离
	        }
	        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
	    },
	    backBoth: function backBoth(t, b, c, d, s) {
	        if (typeof s == 'undefined') {
	            s = 1.70158;
	        }
	        if ((t /= d / 2) < 1) {
	            return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
	        }
	        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
	    },
	    bounceIn: function bounceIn(t, b, c, d) {
	        //弹球减振（弹球渐出）
	        return c - Tween['bounceOut'](d - t, 0, c, d) + b;
	    },
	    bounceOut: function bounceOut(t, b, c, d) {
	        if ((t /= d) < 1 / 2.75) {
	            return c * (7.5625 * t * t) + b;
	        } else if (t < 2 / 2.75) {
	            return c * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + b;
	        } else if (t < 2.5 / 2.75) {
	            return c * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + b;
	        }
	        return c * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + b;
	    },
	    bounceBoth: function bounceBoth(t, b, c, d) {
	        if (t < d / 2) {
	            return Tween['bounceIn'](t * 2, 0, c, d) * 0.5 + b;
	        }
	        return Tween['bounceOut'](t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b;
	    }
	};

	exports['default'] = { Tween: Tween };
	module.exports = exports['default'];

/***/ }
/******/ ]);