/**
 created by fly on 2016/5/17 0017
 */


import './static/css/clock.css';
import {utilMethods,_$,$$} from './utilMethods.es6';

let data = {
    viewWidth: document.documentElement.clientWidth,
    viewHeight:document.documentElement.clientHeight,
    canvas:_$("#clock")
}

let util = {
    init(){
        this.setSize();
        this.initCanvasEffect(data.canvas);
    },
    setSize(width=data.viewWidth,height= data.viewHeight){
        data.canvas.width = width;
        data.canvas.height = height;

    },
    initOffCanvas(canvas){
        let context=canvas.getContext("2d"),
            offCanvas = document.createElement('canvas'),
            offContext = offCanvas.getContext('2d');
        offCanvas.width = data.viewWidth;
        offCanvas.height = data.viewHeight;
        return {canvas,context,offCanvas,offContext};
    },
    initCanvasEffect(canvas){
        let {canvas,context,offCanvas,offContext} = initOffCanvas(canvas);
    }
};

util.init();
