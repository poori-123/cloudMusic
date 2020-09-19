import Http from '../../api/http';
import {SUGGEST_LIST,SEARCH_LIST,SEARCH_HOT} from '../../api/url';

export default {
    namespaced: true,
    state: {
        hotList: [],
        firstLoad: false,
        suggestList: {},
        searchList: [],
        inSearch: false
    },
    mutations: {
        /* 设置热点词汇 */
        setHotList(state,payload){
            state.hotList = payload;
        },
        toggleFirstLoad(state){
            state.firstLoad = !state.firstLoad ;
        },
        /* 设置搜索结果 */
        setSearchReult(state,payload){
            state.suggestList = payload.suggestList;
            state.searchList = payload.searchList;
        },
        toggleInSearch(state){
            state.inSearch = !state.inSearch;
        }
    },
    actions: {
        /* 获取热点词汇 */
        async getHotList(store){
            store.commit('toggleFirstLoad');
            var { data: { result: {hots} } } = await Http.get(SEARCH_HOT);
            var dataList = hots.map( item => ({name: item.first}) );
            store.commit('setHotList', dataList);
            store.commit('toggleFirstLoad');
        },
        /* 获取搜索结果 */
        async getSearchReult(store,payload){
            store.commit('toggleInSearch');
            var { data: { result } }= await Http.get(SUGGEST_LIST, { keywords: payload });
            var suggestList = {};
            if(result.artists){
                suggestList.artists = result.artists.map( item => ({
                    id: item.id,
                    name: item.name,
                    picUrl: item.picUrl
                }) )
            };
            if(result.playlists){
                suggestList.playlists = result.playlists.map( item => ({
                    id: item.id,
                    name: item.name,
                    coverImgUrl: item.coverImgUrl
                }) )
            };

            var { data: { result: { songs } } } = await Http.get(SEARCH_LIST, { keywords: payload });
            var searchList = songs.map( item => ({
                id: item.id,
                name: item.name,
                al: {
                    id: item.album.id,
                    name: item.album.name,
                    picUrl: item.album.artist.img1v1Url
                },
                ar: item.artists.map( ar => ({
                    id: ar.id,
                    name: ar.name
                }) )
            }));

            store.commit('setSearchReult', { suggestList, searchList } );
            store.commit('toggleInSearch');
        }
    }
}