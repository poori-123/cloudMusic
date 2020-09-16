import Http from '../../api/http';

import {ARTIST_LIST,TOP_ARTISTS,ARTISTS_SONGS} from '../../api/url';

export default {
    namespaced: true,
    state: {
        singerList: [],
        loadOver: false,
        inReload: false,
        inLoadMore: false,
        maxNum: false,
        singerSongs: [],
        artist:{},
        inloadSingerSongs: false
    },
    getters: {

    },
    mutations: {
        /* 设置歌手列表 */
        setSingerList( state, payload ){
            state.maxNum = false;
            state.singerList = payload;
            if(!state.loadOver){
                state.loadOver = true;
            }
        },
        setMoreSingerList( state, payload ){
            state.maxNum = false;
            state.singerList.push( ...payload );
        },
        toggleInReload( state ){
            state.inReload = !state.inReload;
        },
        toggleInLoadMore( state ){
            state.inLoadMore = !state.inLoadMore;
        },
        noMore( state ){
            state.maxNum = true;
        },
        /* 设置歌手歌曲列表 */
        setSingerSongs( state, payload ){
            state.singerSongs = payload.dataList;
            state.artist = payload.art;
        },
        toggleInloadSingerSongs( state ){
            state.inloadSingerSongs = !state.inloadSingerSongs;
        },
    },
    actions: {
        async getSingerList( store, payload = {} ){
            store.commit('toggleInReload');
            // setTimeout(async () => {
            //     var { data: { artists } } = await Http.get( ARTIST_LIST, payload );
            //     var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            //     store.commit('setSingerList', list );
            //     store.commit('toggleInReload');
            // }, 2000);
            var { data: { artists , more } } = await Http.get( ARTIST_LIST, payload );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setSingerList', list );
            store.commit('toggleInReload');
            if( !more ){
                store.commit( 'noMore' );
            }
        },
        async getMoreSingerList( store, payload = {} ){
            store.commit('toggleInLoadMore');
            // setTimeout(async () => {
            //     var { data: { artists } } = await Http.get( ARTIST_LIST, payload );
            //     var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            //     store.commit('setMoreSingerList', list );
            //     store.commit('toggleInLoadMore');
            // }, 2000);
            var { data: { artists ,more } } = await Http.get( ARTIST_LIST, payload );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setMoreSingerList', list );
            store.commit('toggleInLoadMore');
            if( !more ){
                store.commit( 'noMore' );
            }
        },
        async getTopSingerList( store ){
            var { data: { artists , more } } = await Http.get( TOP_ARTISTS );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setSingerList', list );
            if( !more ){
                store.commit( 'noMore' );
            }
        },
        async getMoreTopSingerList( store, payload){
            var { data: { artists , more} } = await Http.get( TOP_ARTISTS, payload);
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setMoreSingerList', list );
            if( !more ){
                store.commit( 'noMore' );
            }
        },
        /* 获取歌手歌曲列表 */
        async getSingerSongs( store, payload){
            store.commit('toggleInloadSingerSongs');
            var {data: { hotSongs, artist }} = await Http.get(ARTISTS_SONGS,payload);
            var dataList = hotSongs.map( item => ({
                id: item.id,
                name: item.name,
                al: {
                    id: item.al.id,
                    name: item.al.name,
                    picUrl: item.al.picUrl,
                },
                ar: item.ar
            }) );
            var art = {
                id: artist.id,
                name: artist.name,
                picUrl: artist.picUrl
            };
            store.commit('setSingerSongs',{ dataList, art } );
            store.commit('toggleInloadSingerSongs');
        },
    }
}