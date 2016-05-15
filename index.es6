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

    canvasEffect(canvas){
        createjs.MotionGuidePlugin.install(createjs.Tween);

        canvas.width = data.viewWidth;
        canvas.height = data.viewHeight;

        let cacheCanvas = document.createElement('canvas'),
            context = cacheCanvas.getContext('2d');
        cacheCanvas.width = data.viewWidth;
        cacheCanvas.height = data.viewHeight;
        cacheCanvas.style.border = '1px solid red'

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

        // data.page1.appendChild(cacheCanvas);

        let imgData = context.getImageData(x, y, 900, 300);
        //context2 = canvas.getContext('2d');
        //context2.putImageData(imgData, x, y);


        let dots = [],
            imgDataW = imgData.width,
            imgDataH = imgData.height,
            gap = 8;
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
                let {x,y,r,g,b,a,type} = args;
                this.type = type || 'normal';
                this.life = utilMethods.r(100, 300);
                this.speedX = utilMethods.r(-3,3);
                this.speedY= utilMethods.r(-3,3);
                this.duration = utilMethods.r(1000, 2000);
                this.directionX=  utilMethods.r(0, 1) > .5;
                this.directionY=  utilMethods.r(0, 1) > .5;
                this.startTime =  +new Date();
                this.wait = utilMethods.r(0, 100);
                this.waitInow = 0;
                this.iNow = 0;

                this.x = x;
                this.y = y;
                this.nextPoint = {x:utilMethods.r(-60,60),y:utilMethods.r(-50,50)};
                this.r = r;
                this.g = g;
                this.b = b;
                this.a = a;
                this.create();

            }

            create() {
                let circle = new createjs.Shape(),
                    dot = this;
                this.shape = circle;
                circle.graphics.beginFill('rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')').drawPolyStar(dot.x, dot.y,3,5);
                container.addChild(circle);

                if (this.type === 'normal' && false) {

                    let path = [self.rx(), self.ry(), self.rx(), self.ry(), self.rx(), self.ry()];

                    createjs.Tween.get(this.shape, {loop: true})
                        .to({guide: {path: path, start: 0, end: 1}}, this.duration)
                        .wait(this.wait)
                        .to({guide: {path: path, start: 1, end: 0}}, this.duration);

                }

            }

            move() {
                let s = this;


                if (s.type === 'normal') {//

                    s.iNow+=1;
                    //



                    if (s.iNow >= s.life) {
                        s.iNow = 0;

                        createjs.Tween.get(s.shape).to({
                            x:s.nextPoint.x,
                            y:s.nextPoint.y
                        },s.duration,createjs.Ease.quintOut).call(()=>{
                            s.nextPoint = {x:utilMethods.r(-100,100),y:utilMethods.r(-100,100)};
                            s.duration = utilMethods.r(1000,2000);
                            s.life = utilMethods.r(80,120);
                        });

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


        for (let i = 0; i < 440; i++) {
            let dot = dots[Math.floor(utilMethods.r(0, dots.length - 1))];
            circleArr.push(new Dot({
                x: utilMethods.r(-x, data.viewWidth),
                y: utilMethods.r(-y, data.viewHeight),
                r: dot.r,
                g: dot.g,
                b: dot.b,
                a: .7,
                type: 'normal'
            }))
        }

        stage.addChild(container);

        createjs.Ticker.on("tick", ()=> {
            circleArr.forEach(c=>c.move());
            stage.update();
        });


        /*
         */

    },
    rx() {
        return Math.random() * 1000 + 10;
    }
    , ry() {
        return Math.random() * 300 + 10;
    }
    , rc() {
        return Math.round(Math.random() * 0xED + 0x12).toString(16);
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


