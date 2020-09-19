import Http from '../../../api/http';
import {SONG_KEY} from '../../../api/url';
export default{
    namespaced: true,
    state: {
        showAudio: false,
        playList: [],
        playIndex: -1, //播放下标
        progress: 0, //播放进度

        duration:0, //播放总时长
        currentTime: 0, //现在播放时长

        chooseSort:0, //切换方式

        songKeys: [],

        removeFlag: 0,
        isRemove: false
    },
    getters: {
        nowKey(state){
            var index = state.songKeys.findIndex( item => item.time2 > state.currentTime ) - 1; 
            if(index == 0){
                index = 0
            }else if(index == -2){
                index = state.songKeys.length-1
            }
            return index;
        }
    },
    mutations: {
        setShowAudio(state,payload){
            if(!state.showAudio){
                state.showAudio = true;
            }
            state.playList.unshift(payload);
            state.playList = JSON.parse(JSON.stringify(payload.list));
            state.playIndex = payload.index;
        },
        /* 设置播放总时长 */
        setDuration(state,payload){
            state.duration = payload;
        },
        setCurrentTime(state,payload){
            state.currentTime = payload;
        },
        setProgress(state,payload){
            state.progress = payload;
        },
        changeSort(state){
            if( state.chooseSort == 2 ){
                state.chooseSort = 0;
            }else{
                state.chooseSort ++;
            }
        },
        changeIndex(state,payload){
            var len = state.playList.length;
            var sort = state.chooseSort;
            if( payload == 0 ){  //点击上一曲
                if(sort == 0 || sort == 2){ // 顺序播放,单曲循环(点击)
                    if( state.playIndex == 0 ){
                        state.playIndex = len-1;
                        return;
                    }
                    state.playIndex-- ;
                }else if(sort == 1){ //随机播放
                    while(1){
                       var ran = Math.floor(Math.random()*len);
                       if(ran != state.playIndex){
                           break;
                       }
                    }
                    state.playIndex = ran;
                }
                
            }else if( payload == 1 ){ //点击下一曲
                if(sort == 0 || sort == 2){
                   if( state.playIndex == len-1 ){
                        state.playIndex = 0;
                        return;
                    }
                    state.playIndex++ ; 
                }else if( sort ==1 ){
                    while(1){
                        var ran = Math.floor(Math.random()*len);
                        if(ran != state.playIndex){
                            break;
                        }
                     }
                     state.playIndex = ran;
                }
                
            }
        },
        setSongKeys(state,payload){
            state.songKeys = payload;
        },
        changeSong(state,payload){
            var index = state.playList.findIndex(item => item.id === payload);
            state.playIndex = index;
        },
        removeSong(state,payload){
            var index = state.playList.findIndex(item => item.id === payload);
            state.playList.splice(index,1);
            if( index < state.playIndex ){
                state.playIndex--;
                state.isRemove = true;
            }else if( index == state.playIndex ){
                state.removeFlag++;
            }
        },
        isRemoveAction(state){
            state.isRemove = false;
        }

    },
    actions: {
        async getSongKeys(store,payload){
            var {data: {lrc: {lyric}}} = await Http.get(SONG_KEY,payload);
            var keys = lyric.replace(/\n/g,'');
            var arr1 = keys.split('[');
            arr1.shift();
            var arr2 = arr1.map( item => {
                var [time,text] = item.split(']');
                var time1 = time;
                var key = text;
                var [ mm , ss ] = time.split(':');
                var time2 = Number(mm)*60 + Number(ss);
                return {
                    time1,
                    time2,
                    key
                }
            });
            store.commit('setSongKeys', arr2);
        }
    }
}