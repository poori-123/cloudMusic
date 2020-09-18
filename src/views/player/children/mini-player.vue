<template>
  <div class="mini-player" @click="$emit('show')"  >
    <div 
        class="image play" 
        :class="{pause: !isPlay }"
    >
        <img :src="data.al.picUrl" alt="">
    </div>
    <div class="text">
        <h3>{{data.name}}</h3>
        <h4>{{data.ar.map(arItem=>arItem.name).join('/')}}</h4>
    </div>
    <div class="control" @click.stop="$emit('control')" >
        <circle-player />
        <span class="iconfont" :class="[isPlay ? playIcon : pauseIcon]" ></span>
    </div>
    <div class="list" @click.stop="showListAction" >
        <span class="iconfont icon-liebiao"></span>
    </div>
  </div>
</template>

<script>
import CirclePlayer from './circle-player';
import {mapState} from 'vuex';
export default {
    components: {
        CirclePlayer
    },
    props:{
        data: Object,
        playList: Array,
        isPlay: Boolean,
    },
    data(){
        return {
            playIcon: 'icon-stop',
            pauseIcon: 'icon-zanting1' 
        }
    },
    methods: {
        showListAction(){
            console.log('list')
        }
    }
}
</script>

<style lang="scss" scoped >
@import '../../../assets/global-style.scss';
.mini-player{
    width: 100%;
    height: 0.6rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    .image{
        width: 0.4rem;
        height: 0.4rem;
        margin:  0 0.1rem 0 0.2rem;
        border-radius: 50%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
        &.play{
            animation: cd-rotate 20s linear infinite running;
        }
        &.pause{
            animation-play-state: paused;
        }
    }
    .text{
        flex: 1;
        height: 0.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3{
            font-size: 0.14rem;
            color: $font-color-desc;
        }
        h4{
            font-size: 0.12rem;
            color: $font-color-desc-v2;
        }
    }
    .control{
        width: 0.3rem;
        height: 0.3rem;
        border-radius: 50%;
        // border: 0.01rem solid $theme-color;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 0.1rem;
        position: relative;
        .canvas{
            position: absolute;
            top: 0;
            left: 0;
        }
        .iconfont{
            font-size: 0.16rem;
            color: $theme-color;
        }
    }
    .list{
        width: 0.3rem;
        height: 0.3rem;
        margin: 0 0.1rem;
        .iconfont{
            font-size: 0.3rem;
            color: $theme-color;
            line-height: 0.3rem;
        }
    }
}
@keyframes cd-rotate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>