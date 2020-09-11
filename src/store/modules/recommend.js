import Http from '../../api/http'
import {BANNER_URL,RECOMMEND_LIST_URL} from '../../api/url'

export default {
    namespaced: true,
    state: {
        bannerList: [],
        recommendList: [],
        getBanner: false,
        getRecommend: false
    },
    getters: {
        loadOver(state){
            return state.getBanner && state.getRecommend;
        }
    },
    mutations: {
        setBannerList(state,payload){
            state.bannerList = payload;
        },
        setRecommendList(state,payload){
            state.recommendList = payload;
        }
    },
    actions: { 
        async getBannerList(store){
            store.state.getBanner = false;
            var { data: { banners } } = await Http.get(BANNER_URL);
            var dataList = banners.map( ({imageUrl,url}) => ({imageUrl,url}));
            store.commit('setBannerList',dataList);
            store.state.getBanner = true; 
        },
        async getRecommendList(store){
            store.state.getRecommend = false;
            var { data: { result } } = await Http.get(RECOMMEND_LIST_URL);
            var dataList = result.map( ({id,name,picUrl,playCount}) => ({id,name,picUrl,playCount}));
            store.commit('setRecommendList',dataList);
            store.state.getRecommend = true;
        }

    }
}