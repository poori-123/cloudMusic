import appScroll from '../components/common/scroll.vue';
import { Lazyload } from 'vant';


import loadImg from '../assets/music.png';
import errorImg from '../assets/error.jpg';
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
        )
    }
}