import Http from '../../api/http'
import {RANK_LIST} from '../../api/url'

export default {
    namespaced: true,
    state: {
        officialList: [],
        globalList: [],
        loadOver: false
    },
    getters: {

    },
    mutations: {
        setData( state, payload ){
            state.officialList = payload.officialList;
            state.globalList = payload.globalList;
            state.loadOver = true;
        }
    },
    actions: {
        async loadRank( store ){
            var { data: { list }} = await Http.get( RANK_LIST );
            var dataList = list.map( ({id,name,coverImgUrl,tracks,updateFrequency}) => ({id,name,coverImgUrl,tracks,updateFrequency}) );
            var officialList = dataList.filter( item => item.tracks.length!=0 );
            var globalList = dataList.filter( item => item.tracks.length==0 );
            store.commit('setData', { officialList, globalList});
        }
    }
}