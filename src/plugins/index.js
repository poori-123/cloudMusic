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
    }
}