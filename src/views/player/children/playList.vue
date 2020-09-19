<template>
  <div class="play-list" @click="$emit('showList')" >
    <div class="list-wrap" @click.stop="">
        <h1 @click="changeSortAction">
            <span class="iconfont" :class="playSort[chooseSort].icon"></span>
            <span class="icontext">{{playSort[chooseSort].text}}</span>
        </h1>
        <div class="scroll-wrap" ref="scroll">
            <ul>
                <li v-for="(item,index) in playList" :key="item.id" @click="changeSong(item)" >
                    <div class="playNow">
                        <span class="iconfont icon-bofang" v-show="index === playIndex" ></span>
                    </div>
                    <h3>{{item.name}} - {{item.ar.map(arItem=>arItem.name).join('/')}}</h3>
                    <span class="iconfont icon-xihuan2"></span>
                    <span class="iconfont icon-shanchu" @click.stop="removeAction(item.id)" ></span>
                </li>
            </ul> 
        </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    data(){
        return {
            playSort: [
                {
                    icon:'icon-shunxubofang',
                    text:'顺序播放'
                },
                {
                    icon:'icon-suiji',
                    text:'随机播放'
                },
                {
                    icon:'icon-danquxunhuan1',
                    text:'单曲循环'
                }
            ],
        }
    },
    computed: {
        ...mapState({
            playList: state => state.player.playList,  //歌曲列表
            playIndex: state => state.player.playIndex,
            chooseSort: state => state.player.chooseSort
        })
    },
    methods: {
        changeSortAction(){
            this.$store.commit('player/changeSort');
        },
        changeSong(item){
            this.$store.commit('player/changeSong',item.id);
        },
        removeAction(id){
            this.$store.commit('player/removeSong',id);
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll,{
            tap: true,
            click: true
        });
        this.scroll.on('beforeScrollStart' , () => {
            this.scroll.refresh();
        });
    }
}
</script>

<style scoped lang="scss">
@import '../../../assets/global-style.scss';
.play-list{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.3);
    .list-wrap{
        width: 100%;
        position: absolute;
        top: 2.19rem;
        bottom: 0;
        overflow: hidden;
        background: #fff;
        border-radius: 0.1rem 0.1rem 0 0;
        h1{
            width: 100%;
            height: 0.48rem;
            padding: 0.2rem 0.2rem 0.1rem;
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 0.18rem;
                color: $theme-color;
                margin-right: 0.05rem;
                line-height: 0.18rem;
            }
            .icontext{
                font-size: 0.14rem;
                color: #333;
                line-height: 0.14rem;
            }
        }
        .scroll-wrap{
            width: 100%;
            position: absolute;
            top: 0.48rem;
            bottom: 0;
            overflow: hidden;
            ul{
                width: 100%;
                li{
                    width: 100%;
                    height: 0.4rem;
                    padding: 0 0.3rem 0 0.2rem;
                    display: flex;
                    align-items: center;
                    .playNow{
                        width: 0.22rem;
                        height: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .icon-bofang{
                            font-size: 0.12rem;
                            color: $theme-color;
                            margin-right: 0.1rem;
                        }
                    }
                    h3{
                        font-size: 0.14rem;
                        color: $font-color-desc-v2;
                        width: 2.5rem;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                    }
                    .icon-xihuan2{
                        font-size: 0.14rem;
                        color: $theme-color;
                        margin-right: 0.1rem;
                    }
                    .icon-shanchu{
                        font-size: 0.14rem;
                        width: 0.14rem;
                        height: 0.14rem;
                        color: $theme-color;
                        position: relative;
                        &::after{
                            content: '';
                            position: absolute;
                            top: -50%;
                            left: -50%;
                            width: 200%;
                            height: 200%;
                            z-index: -1;
                        }
                    }
                }   
            }
        }
    }
}
</style>