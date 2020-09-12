import Http from '../../api/http';

import {ARTIST_LIST,TOP_ARTISTS} from '../../api/url';

export default {
    namespaced: true,
    state: {
        singerList: [],
        loadOver: false,
        inReload: false
    },
    getters: {

    },
    mutations: {
        setSingerList( state, payload ){
            state.singerList = payload;
            if(!state.loadOver){
                state.loadOver = true;
            }
        },
        setMoreSingerList( state, payload ){
            state.singerList.push( ...payload );
        },
        toggleInReload( state ){
            state.inReload = !state.inReload;
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
            var { data: { artists } } = await Http.get( ARTIST_LIST, payload );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setSingerList', list );
            store.commit('toggleInReload');
        },
        async getMoreSingerList( store, payload = {} ){
            var { data: { artists } } = await Http.get( ARTIST_LIST, payload );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            console.log(list)
            store.commit('setMoreSingerList', list );
        },
        async getTopSingerList( store ){
            var { data: { artists } } = await Http.get( TOP_ARTISTS );
            var list = artists.map( ({id,name,img1v1Url}) => ({id,name,img1v1Url}) );
            store.commit('setSingerList', list );
        },
    }
}