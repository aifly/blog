/**
 created by fly on 2016/5/10 0010
 */
import './static/css/index.css';
import bg from  './static/images/1.png';
import {utilMethods,_$,$$} from './utilMethods.es6';

let data = {
    main: _$('#fly-main'),
    navIco:_$('.fly-nav-ico'),
    menu:_$('.fly-nav'),
    mask:_$('#fly-main .fly-mask'),
    page1:_$('#fly-page1')
}


let util = {
    init(){
        this.setBg();
        this.bindEvent();
    },
    bindEvent(){

        let f  = ()=>{
            data.mask.classList.toggle('show');
            data.main.classList.toggle('active');
            data.menu.classList.toggle('active');
        }

        data.navIco.addEventListener('mousedown',()=>{
            this.toggleMenu(true);
        });
        data.navIco.addEventListener('mouseup',()=>{
            this.toggleMenu(false);

            utilMethods.addClass($$('li',data.menu),'active');

            f();

        });

        data.mask.addEventListener('click',()=>{
            f();
            utilMethods.removeClass($$('li',data.menu),'active');
        })


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
            data.page1
        ];
        [bg].forEach((b, i)=> {
            arr[i].style.background = 'url(./static/js/' + b + ') no-repeat center center';
            arr[i].style.backgroundSize = 'cover';
        });
    }
};

util.init();


