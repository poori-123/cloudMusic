import Http from '../../api/http';

import {ARTIST_LIST,TOP_ARTISTS} from '../../api/url';

export default {
    namespaced: true,
    state: {
        singerList: [],
        loadOver: false,
        inReload: false,
        inLoadMore: false,
        maxNum: false
    },
    getters: {

    },
    mutations: {
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
        }
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
            var { data: { artists } } = await Http.get( TOP_ARTISTS );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setSingerList', list );
        },
        async getMoreTopSingerList( store, payload){
            var { data: { artists , more} } = await Http.get( TOP_ARTISTS, payload);
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setMoreSingerList', list );
            if( !more ){
                store.commit( 'noMore' );
            }
        },
    }
}