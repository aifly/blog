/**
 created by fly on 2016/5/10 0010
 */
import './static/css/index.css';
/*import bg from  './static/images/1.png';*/
import {utilMethods,_$,$$} from './utilMethods.es6';
import {Tween} from './static/libs/tween';

let data = {
    main: _$('#fly-main'),
    navIco: _$('.fly-nav-ico'),
    menu: _$('.fly-nav'),
    mask: _$('#fly-main .fly-mask'),
    page1: _$('#fly-page1'),
    border: _$('#fly-main .fly-border'),
    canvas: document.getElementById('fly-html5'),
    viewWidth: document.documentElement.clientWidth,
    viewHeight: document.documentElement.clientHeight
};


let util = {
    init(){
        this.setBg();
        this.bindEvent();
        this.canvasEffect(data.canvas);
    },

    setTransformOrigin(obj, x, y, z) {
        obj.style.transformOrigin = x + 'px ' + y + 'px ' + (z || 0) + 'px';
        obj.style.WebkitTransformOrigin = x + 'px ' + y + 'px ' + (z || 0) + 'px';
    },
    setTransform(obj, x, y, scale) {
        obj.style.transform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + y + 'deg)';
        obj.style.WebkitTransform = 'rotateX(' + x + 'deg) rotateY(' + y + 'deg) rotateZ(' + y + 'deg)';
    },

    printText(text, str){
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
                let width = 0;
                $$('span', p).forEach((item)=> {
                    width += item.offsetWidth;
                });
                p.style.width = width + 'px';

                data.border.style.left = (p.offsetLeft + width) + "px";
                index++;
            }
            else {
                index = 0;
                p.innerHTML = '';
            }
        }, 400);
    },
    dis(x1, x2, y1, y2){
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },

    canvasEffect(canvas){
        createjs.MotionGuidePlugin.install(createjs.Tween);

        canvas.width = data.viewWidth;
        canvas.height = data.viewHeight;

        let cacheCanvas = document.createElement('canvas'),
            context = cacheCanvas.getContext('2d');
        cacheCanvas.width = data.viewWidth;
        cacheCanvas.height = data.viewHeight;

        let circleCanvas = document.createElement('canvas'),
            circleContext = circleCanvas.getContext('2d');

         circleCanvas.width = 900;
         circleCanvas.height = 300;
        circleCanvas.style.left = '50%';
        circleCanvas.style.top = '50%';
        circleCanvas.style.marginLeft = '-450px';
        circleCanvas.style.marginTop = '-150px';
        circleCanvas.ang = 0 ;



        context.font = "250px Georgia";
        let x = (data.viewWidth - 900) / 2,
            y = (data.viewHeight - 300) / 2,
            w = (data.viewWidth - 900) / 2 + 800,
            h = (data.viewHeight) / 1.5 + 300;

        let color = context.createLinearGradient(x, y, w, h);
        color.addColorStop(0, "#e2b722");
        color.addColorStop(1, "#8dd003");
        context.fillStyle = color;

        context.textBaseline = 'top';
        context.fillText('HTML5', x, y);

        data.page1.appendChild(circleCanvas);

       /* let h5Stage = new createjs.Stage(circleCanvas);
        let h5Container = new createjs.Container();
        h5Stage.addChild(h5Container);
        h5Stage.update();*/

        let imgData = context.getImageData(x, y, 900, 300);
        let context2 = canvas.getContext('2d');
        //context2.putImageData(imgData, x, y);


        let centerX = data.viewWidth >> 1,
            centerY = data.viewHeight >> 1,
            r = 50;



        let dots = [],
            gap = 8,
            imgDataW = imgData.width,
            imgDataH = imgData.height;
        for (let i = 0; i < imgDataW; i += gap) {
            for (let j = 0; j < imgDataH; j += gap) {
                let a = (i + j * imgDataW) * 4;
                if (imgData.data[a + 3] > 128) {
                    dots.push({
                        x: i,
                        y: j,
                        r: imgData.data[a],
                        g: imgData.data[a + 1],
                        b: imgData.data[a + 2],
                        a: imgData.data[a + 3]
                    })
                }
            }
        }

        let stage = new createjs.Stage(canvas);

        let self = this;

        class Dot {
            constructor(args) {
                let {x,y,r,g,b,a,type,state} = args,
                    s = this;
                s.type = type || 'normal';
                s.state = state || 'move';
                s.life = Math.round(utilMethods.r(20, 40));
                s.duration = utilMethods.r(1000, 2000);
                s.wait = utilMethods.r(450, 1200);
                s.iNow = 0;
                s.x = x;
                s.y = y;
                s.nextPoint = {x: utilMethods.r(-60, 60), y: utilMethods.r(-50, 50)};
                s.r = r;
                s.g = g;
                s.b = b;
                s.a = a;
                s.create();

            }

            create() {
                let circle = new createjs.Shape(),
                    dot = this;
                this.shape = circle;
                if (dot.type === 'word') {
                    //circle.graphics.beginFill('rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')').drawPolyStar(0, 0, 4, 5, 0, -18);
                    circleContext.fillStyle = 'rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')';
                    circleContext.beginPath();
                    circleContext.arc(dot.x,dot.y,4,0,Math.PI*2,false);
                    circleContext.closePath();
                    circleContext.fill();
                }
                else {
                    circle.graphics.beginFill('rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')').drawCircle(0, 0, 3);
                    container.addChild(circle);
                    circle.x = dot.x;
                    circle.y = dot.y;
                }




            }


            move() {
                let s = this;

                if (s.type === 'normal') {//
                    s.iNow += 1;
                    if (s.state === 'move') {//在整个屏幕中随机运动。

                        if (s.iNow % s.life === 0) {
                            if (s.iNow % (s.life * 4) === 0) {
                                s.state = 'close';
                                s.iNow = 0;
                            }
                            createjs.Tween.get(s.shape).to({
                                x: s.nextPoint.x,
                                y: s.nextPoint.y
                            }, s.duration, createjs.Ease.quintOut).call(()=> {
                                s.nextPoint = {
                                    x: utilMethods.r(-x, data.viewWidth) - s.x,
                                    y: utilMethods.r(-y, data.viewHeight) - s.y
                                };
                                s.duration = utilMethods.r(1000, 2000);
                                s.life = Math.round(utilMethods.r(110, 220));
                            });
                        }

                    }
                    else if (s.state === 'close') {

                        if (s.iNow % (s.life * 2 ) === 0) {

                            if (s.iNow % (s.life * 4) === 0) {
                                s.state = 'open';
                                s.iNow = 0;
                            }
                            createjs.Tween.get(s.shape)
                                .to({
                                    scaleX: 2,
                                    scaleY: 2
                                }, 400, createjs.Ease.easeIn)
                                .wait(s.wait)
                                .to({
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: centerX - x,//;arr[Math.floor(utilMethods.r(0, arr.length))].x,
                                    y: centerY - y//arr[Math.floor(utilMethods.r(0, arr.length))].y
                                }, s.duration / 1.5, createjs.Ease.quintOut).call(()=> {

                            });
                        }

                    }
                    else if (s.state === 'open') {
                        if (s.iNow % (s.life * 2 ) === 0) {
                            createjs.Tween.get(s.shape)
                                .wait(s.wait * 5)
                                .to({
                                    scaleX: 1,
                                    scaleY: 1,
                                    x: utilMethods.r(-x, data.viewWidth),
                                    y: utilMethods.r(-x, data.viewHeight)//arr[Math.floor(utilMethods.r(0, arr.length))].y
                                }, s.duration, createjs.Ease.quintOut).call(()=> {

                            });
                            if (s.iNow % (s.life * 4) === 0) {
                                s.state = 'move';
                                s.iNow = 0;
                            }
                        }

                    }

                }
                else {

                }
            }
        }


        let container = new createjs.Container().set({x: x, y: y}),
            circleArr = [];

        dots.forEach(dot=> {
            circleArr.push(new Dot({x: dot.x, y: dot.y, r: dot.r, g: dot.g, b: dot.b, a: dot.a, type: 'word'}));
        });

        for (let i = 0; i < 600; i++) {
            let dot = dots[Math.floor(utilMethods.r(0, dots.length - 1))];

            circleArr.push(new Dot({
                x: utilMethods.r(-x, data.viewWidth),
                y: utilMethods.r(-y, data.viewHeight),
                r: dot.r,
                g: dot.g,
                b: dot.b,
                a: .5,
                type: 'normal',
                state: 'close'
            }))
        }


        stage.addChild(container);

        createjs.Ticker.on("tick", ()=> {
            circleArr.forEach(c=>c.move());
            circleCanvas.style.transform= "rotateY("+(circleCanvas.ang++)+"deg)";
            stage.update();
        });

        /*
         */

    },
    bindEvent(){

        //this.printText(_$('.fly-js'), 'javascript');

        let f = ()=> {
            data.mask.classList.toggle('show');
            data.main.classList.toggle('active');
            data.menu.classList.toggle('active');
        }

        data.navIco.addEventListener('mousedown', ()=> {
            this.toggleMenu(true);
        });
        data.navIco.addEventListener('mouseup', ()=> {
            this.toggleMenu(false);

            utilMethods.addClass($$('li', data.menu), 'active');

            f();

        });

        data.mask.addEventListener('click', ()=> {
            f();
            utilMethods.removeClass($$('li', data.menu), 'active');
        })


        data.navIco.addEventListener('mouseout', ()=> {
            this.toggleMenu(false);
        });


        data.page1.mousemove = (e)=> {
            var disX = e.pageX - this.x;
            var disY = e.pageY - this.y;

            this.setTransform(data.main, -disY / 10, disX / 22, 1);
        };

        data.page1.mouseup = (e)=> {
            this.setTransform(data.main, 0, 0, 1);
            this.x = this.y = 0;

            data.main.style = null;
            document.removeEventListener('mousemove', data.page1.mousemove);
            document.removeEventListener('mouseup', document.mouseup);
        };


        data.page1.addEventListener('mousedown', (e) => {


            data.main.style = null;
            e.preventDefault();
            this.x = e.pageX;
            this.y = e.pageY;
            this.setTransformOrigin(data.main, (data.viewWidth) / 2, (data.viewHeight) / 2, 0);

            document.addEventListener('mousemove', data.page1.mousemove);
            document.addEventListener('mouseup', data.page1.mouseup);

            return false;
        })


    },

    toggleMenu(toggle){
        if (toggle) {
            data.navIco.classList.add('shadow');
        } else {
            data.navIco.classList.remove('shadow');
        }
    },
    setBg(){
        /* let arr = [
         data.page1
         ];
         [bg].forEach((b, i)=> {
         arr[i].style.background = 'url(./static/js/' + b + ') no-repeat center center';
         arr[i].style.backgroundSize = 'cover';
         });*/
    }
};

util.init();


