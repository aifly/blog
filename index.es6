/**
 created by fly on 2016/5/10 0010
 */
import './static/css/index.css';
import bg from  './static/images/2.png';
import bodyBg from  './static/images/1.png';
import {utilMethod,_$,$$} from './utilMethods.es6';

let data = {
    main: _$('#fly-main'),
    navIco:_$('.fly-nav-ico'),
    menu:_$('.fly-menu')
}


let util = {
    init(){
        this.setBg();
        this.bindEvent();
    },
    bindEvent(){

        data.navIco.addEventListener('click',()=>{
            _$('div',data.navIco).classList.toggle('active');
            data.menu.classList.toggle('active');
        });

        data.navIco.addEventListener('mousedown',()=>{
            this.toggleMenu(true);
        });
        data.navIco.addEventListener('mouseup',()=>{
            this.toggleMenu(false);
        });
        data.navIco.addEventListener('mouseout',()=>{
            this.toggleMenu(false);
        });
    },

    toggleMenu(toggle){
        if(toggle){
            data.navIco.classList.add('shadow');
        }else{
            data.navIco.classList.remove('shadow');
        }
    },
    setBg(){
        let arr = [
            document.body,
            data.main
        ];
        [bodyBg, bg].forEach((b, i)=> {
            arr[i].style.background = 'url(' + b + ') no-repeat center center';
            arr[i].style.backgroundSize = 'cover';
        });
    }
};

util.init();


