import Http from '../../api/http';
import {BANNER_URL,RECOMMEND_LIST_URL,SONG_LIST_URL} from '../../api/url';

export default {
    namespaced: true,
    state: {
        bannerList: [],
        recommendList: [],
        songList: {},
        getBanner: false,
        getRecommend: false,
        getSongList: false
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

        /* 设置歌单列表数据 */
        setSongList(state,payload){
            state.songList = payload;
        },
        setSong(state,payload){
            state.getSongList = payload;
        }
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

        /* 获取歌单列表数据 */
        async getSongList(store,payload){
            store.commit('setSong',false);
            var { data: { playlist} } = await Http.get(SONG_LIST_URL,payload);
            var dataList = {
                id: playlist.id,
                name: playlist.name,
                coverImgUrl: playlist.coverImgUrl,
                subscribedCount: playlist.subscribedCount,
                creator: {
                    avatarUrl: playlist.creator.avatarUrl,
                    nickname: playlist.creator.nickname
                },
                tracks: playlist.tracks.map( item => ({
                    id: item.id,
                    name: item.name,
                    ar: item.ar.map( arItem => ({
                        id: arItem.id,
                        name: arItem.name
                    }) ),
                    al: {
                        id: item.al.id,
                        name: item.al.name,
                        picUrl: item.al.picUrl
                    }
                }) )
            };
            store.commit('setSongList',dataList);
            // setTimeout(() => {
                store.commit('setSong',true);
                
            // }, 3000);
        }

    }
}