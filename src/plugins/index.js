import appScroll from '../components/common/scroll.vue';
import { Lazyload } from 'vant';


import loadImg from '../assets/music.png';
export default {
    install(Vue){
        Vue.use(Lazyload, {
            lazyComponent: true,
            loading: loadImg
        });
        Vue.component('appScroll',appScroll);
    }
}