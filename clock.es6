/**
 created by fly on 2016/5/17 0017
 */


import './static/css/clock.css';
import {utilMethods,_$,$$} from './utilMethods.es6';


let data = {
    viewWidth: document.documentElement.clientWidth,
    viewHeight: document.documentElement.clientHeight,
    canvas: _$("#clock"),
    main: _$("#fly-main")
}

let requestFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    };
let util = {


    init(){
        this.setSize();
        this.initCanvasEffect(data.canvas);
    },
    setSize(width = data.viewWidth, height = data.viewHeight){
        data.canvas.width = width;
        data.canvas.height = height;

    },
    initSecCanvas(canvas){
        let context = canvas.getContext("2d"),
            secCanvas = document.createElement('canvas'),
            secContext = secCanvas.getContext('2d');
        secCanvas.width = 300;
        secCanvas.height = 300;

        return {context, secCanvas, secContext};
    },
    fillTime(seconds, offContext, w, h){

        offContext.clearRect(0, 0, w, h);
        offContext.fillText(seconds, 0, 0);
        return this.getImgData(offContext, w, h);
    },

    getImgData(offContext, width, height){
        let imgData = offContext.getImageData(0, 0, width, height),
            gap = 10,
            dots = [];
        for (let i = 0, w = imgData.width; i < w; i += gap) {
            for (let j = 0, h = imgData.height; j < h; j += gap) {
                let a = (i + j * width) * 4;
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
        return dots;
    },
    initCanvasEffect(c){
        let {context,secCanvas,secContext} = this.initSecCanvas(c);
        secContext.textBaseline = 'top';
        secContext.font = "250px Georgia";
        this.ballArr = [];
        this.moveBallArr = [];
        window.arr = this.moveBallArr;

        let color = secContext.createLinearGradient(0, 0, secCanvas.width, secCanvas.height);
        color.addColorStop(0, "#e2b722");
        color.addColorStop(1, "#8dd003");
        secContext.fillStyle = color;

        let width = secCanvas.width,
            height = secCanvas.height;


        let centerX = data.viewWidth >> 1,
            centerY = data.viewHeight >> 1,
            offLeft = (data.viewWidth - width) >> 1,
            offTop = (data.viewHeight - height) >> 1;


        let self = this;

        let stage = new createjs.Stage(c);
        let colorArr = ["#f28613","#a3590a","#774c1e","#d2a419","#d5ba67","#f0b708","#fefba1","#aea801"];
        class Ball {
            constructor(args) {
                let {x,y,r,g,b,a,type} = args,
                    s = this;
                s.x = x;
                s.y = y;
                s.r = r;
                s.g = g;
                s.b = b;
                s.a = a;
                s.type = type;
                s.ripe =false;
                s.speedY = -utilMethods.r(30, 40, 'round');
                s.speedX = -utilMethods.r(2, 6, 'round');

                s.create();
            };


            create() {
                let dot = this;
               // context.fillStyle = 'rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')';

                let shape = new createjs.Shape();
                let color=colorArr[utilMethods.r(0,colorArr.length,'floor')];
                //color='rgba(' + dot.r + ',' + dot.g + ',' + dot.b + ',' + dot.a + ')'
                shape.graphics.beginFill(color).drawCircle(0, 0, 4);
                shape.x = dot.x;
                shape.y = dot.y;
                stage.addChild(shape);
                dot.shape = shape;
            }
        }

        this.Ball = Ball;


        ///context.clearRect(0, 0, data.viewWidth, data.viewHeight);
        let marginLeft = 150,
            containerX = (data.viewWidth - 1200) / 2;


        this.render(secContext, width, height, containerX, offTop);


        setInterval(()=> {
            this.ballArr.forEach((b, i)=> {

                if(!b.ripe &&  b.type === 'seconds'){
                    //this.ballArr.splice(i, 1);
                    this.moveBallArr.push(b);
                }

            });


           let {seconds,mins} = this.renderSec('seconds', secContext, width, height, containerX, offTop);

/*            if(seconds === "00"){
                this.ballArr.forEach((b, i)=> {
                    if(b.type === 'mins'){
                        this.moveBallArr.push(b);
                    }
                });
                this.renderSec('mins', secContext, width, height, containerX, offTop)
            }*/

        }, 1000);


        createjs.Ticker.on('tick', ()=> {

            this.moveBallArr.forEach((ball, i)=> {
                ball.speedY += 5;

                let T = ball.shape.y + ball.speedY;

                if (T > data.viewHeight - 8) {
                    T = data.viewHeight - 8 ;
                    ball.speedY *= -.76;
                }

                if (Math.abs(ball.speedY) < 4 && T >= data.viewHeight - offTop) {
                    ball.speedY = 0;
                   // T = data.viewHeight - 4 - offTop;
                }
                ball.shape.scaleX=2;
                ball.shape.scaleY=2;
                ball.shape.x += ball.speedX;
                ball.shape.y = T;

                if (ball.shape.x <= 0) {
                    stage.removeChild(ball.shape);
                    ball = null;
                    let b= this.moveBallArr.splice(i, 1)[0];
                    this.ballArr.forEach((bb,j)=>{
                        if(bb === b){
                            this.ballArr.splice(j,1);
                        }
                    })

                }

                ///console.log(this.moveBallArr.length)


                //console.log(T);
            });


            stage.update();
        });


    },
    startMove(stage){
        let self = this;


    },

    fillZero(num){
        return num < 10 ? "0" + num : num;
    },


    render(secContext, width, height, containerX, offTop){
        let marginLeft = 150,
            date = new Date(),
            hours = date.getHours(),
            mins = date.getMinutes(),
            seconds = date.getSeconds();
        hours = this.fillZero(hours);
        mins = this.fillZero(mins);
        seconds = this.fillZero(seconds);
        this.update(hours, 'hour', secContext, width, height, containerX, offTop);//时
        this.update(":", '0', secContext, width, height, containerX + width, offTop);//时
        this.update(mins, 'mins', secContext, width, height, containerX + marginLeft + width, offTop);//分
        this.update(":", '0', secContext, width, height, containerX + width * 2 + marginLeft, offTop);//时
        this.update(seconds, 'seconds', secContext, width, height, containerX + (marginLeft + width) * 2, offTop); //秒
    },
    renderSec(type, secContext, width, height, containerX, offTop){
        let marginLeft = 150,
            date = new Date(),
            hours = date.getHours(),
            mins = date.getMinutes(),
            seconds = date.getSeconds();
        hours = this.fillZero(hours);
        mins = this.fillZero(mins);
        seconds = this.fillZero(seconds);
        let current = seconds;
        switch (type) {
            case "hours":
                current = hours;
                break;
            case "mins":
                current = mins;
                break;
            case "seconds":
                current = seconds;
                break;
        }
        this.update(current, type, secContext, width, height, containerX + (marginLeft + width) * 2, offTop); //秒

        return {seconds,mins}
    },


    update(time, type, offContext, width, height, offLeft, offTop){

        this.dots = this.fillTime(time, offContext, width, height);

        this.dots.forEach((dot, i)=> {
            this.ballArr.push(new this.Ball({
                x: dot.x + offLeft,
                y: offTop / 1.5 + dot.y,
                r: dot.r,
                g: dot.g,
                b: dot.b,
                a: dot.a,
                type: type
            }));
        });
    }
};

util.init();
