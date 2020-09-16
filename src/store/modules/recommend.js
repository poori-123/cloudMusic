import Http from '../../api/http';
import {BANNER_URL,RECOMMEND_LIST_URL,SONG_LIST_URL} from '../../api/url';

export default {
    namespaced: true,
    state: {
        bannerList: [],
        recommendList: [],
        getBanner: false,
        getRecommend: false,
    },
    getters: {
        loadOver(state){
            return state.getBanner && state.getRecommend;
        }
    },
    mutations: {
        /* 设置banner图数据 */
        setBannerList(state,payload){
            state.bannerList = payload;
        },
        /* 设置banner图加载状态 */
        setBanner(state,payload){
            state.getBanner = payload;
        },

        /* 设置推荐歌单数据 */
        setRecommendList(state,payload){
            state.recommendList = payload;
        },
        /* 设置推荐歌单加载状态 */
        setRecommend(state,payload){
            state.getRecommend = payload;
        },

    },
    actions: { 
        /* 获取banner图数据 */
        async getBannerList(store){
            store.commit('setBanner',false);
            var { data: { banners } } = await Http.get(BANNER_URL);
            var dataList = banners.map( ({imageUrl,url}) => ({imageUrl,url}));
            store.commit('setBannerList',dataList);
            store.commit('setBanner',true);
        },

        /* 获取推荐歌单数据 */
        async getRecommendList(store){
            store.commit('setRecommend',false);
            var { data: { result } } = await Http.get(RECOMMEND_LIST_URL);
            var dataList = result.map( ({id,name,picUrl,playCount}) => ({id,name,picUrl,playCount}));
            store.commit('setRecommendList',dataList);
            store.commit('setRecommend',true);
        },


    }
}