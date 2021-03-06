import appScroll from '../components/common/scroll.vue';
import { Lazyload } from 'vant';


import loadImg from '../assets/music.png';
import errorImg from '../assets/error.jpg';

import './loadStyle.scss';

export default {
    install(Vue){
        Vue.use(Lazyload, {
            lazyComponent: true,
            loading: loadImg,
            error: errorImg
        });
        Vue.component('appScroll',appScroll);

        Vue.filter(
            'peopleNum',
            (num,lim=0) => {
                if(num < 1000){
                    return num + '人';
                }else if(num >= 0 && num < 10000){
                    return (num/10000).toFixed(1) + '万';
                }else if(num >= 10000){
                    return Math.floor( num / (10000 / Math.pow(10,lim) ) ) / Math.pow(10,lim) + '万';
                }
            }
        );

        var Loading = Vue.extend({
            render(){
                return (
                    <div id="loading">
                        <span></span>
                        <span></span>
                    </div>
                )
            }
        });

        Vue.mixin({
            watch: {
                loading(newVal){
                    if(this.handleLoading){
                        if(newVal){
                            this.$showLoading();
                        }else{
                            this.$hideLoading();
                        }
                    }
                }
            },
            methods: {
                $showLoading(){
                    if (this.$isLoading) {
                        return;
                    }
                    var wrap = (this._wrapDom = document.createElement('div'));
                    wrap.setAttribute('id','load-wrap');
                    var model = document.createElement('div');
                    model.setAttribute('id','model');
                    document.documentElement.appendChild(wrap);
                    wrap.appendChild(model);

                    this._loading = new Loading();
                    this._loading.$mount('#model');
                    this.$isLoading = true;
                    
                },
                $hideLoading(){
                    if(this.$isLoading){
                        this._loading.$destroy();
                        
                        document.documentElement.removeChild(this._wrapDom);
                        this.$isLoading = false;
                    }
                }
            }
        })
    }
}