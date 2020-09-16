import Http from '../../api/http';
import {SONG_LIST_URL} from '../../api/url';

export default {
    namespaced: true,
    state: {
        songList: {},
        getSongList: false
    },
    mutations: {
        /* 设置歌单列表数据 */
        setSongList(state,payload){
            state.songList = payload;
        },
        setSong(state,payload){
            state.getSongList = payload;
        }
    },
    actions: {
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