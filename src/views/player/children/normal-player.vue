<template>
  <div class="normal-player" v-if="data" >
      <div class="bgimg">
          <div class="img" :style="{'background-image': `url(${data.al.picUrl})`}"></div>
          <div class="mask1"></div>
          <div class="mask2"></div>
      </div>
      <header ref="header">
          <div class="icon" @click="$emit('show')" >
              <span class="iconfont icon-jiantou1"></span>
          </div>
          <div class="msg">
              <h3>{{data.name}}</h3>
              <h4>{{data.ar.map(arItem=>arItem.name).join('/')}}</h4>
          </div>
      </header>
      <main>
          <div class="disk-wrap" v-show="!showKeys">
            <div class="diskTop" :class="{play: isPlay}" >
                <img :src="diskTop" alt="">
            </div>
            <div 
                class="disk play" 
                :class="{pause: !isPlay }" 
                :style="{'background-image':`url(${disk})`}" 
                ref="disk"
                @click="showKeysAction(true)"
                >
                <img :src="data.al.picUrl" alt="">
            </div>
          </div>
          <song-keys :isShow="showKeys" v-if="showKeys" @showIF="showKeysAction(false)" @switchKey="switchKeyAction" />
      </main>
      <footer ref="footer">
          <div class="speed">
              <span>倍速听歌</span>
              <span 
                v-for="item in speed" 
                :key="item"
                :class="{ choose: item === chooseSpeed }"
                @click="choose(item)"
                >x{{item}}</span>
          </div>
          <div class="control-bar">
            <span>{{currentTime | timeF}}</span>
            <bar-player 
                :value="value" 
                @drag= "dragAction"
                />
            <span>{{duration | timeF}}</span>
          </div>
          <div class="control-btn">
              <span class="iconfont" :class="playSort[chooseSort]" @click="changeSortAction"></span>
              <span class="iconfont icon-shangyiqu101" @click="preAction" ></span>
              <span 
                class="iconfont" 
                :class="isPlay ? 'icon-plus-pause' : 'icon-bofang1'" 
                @click.stop="$emit('control')"
                ></span>
              <span class="iconfont icon-xiayiqu101" @click="nextAction" ></span>
              <span class="iconfont icon-liebiao"></span>
          </div>
      </footer>
  </div>
</template>

<script>
import disk from '../../../assets/cd.png';
import diskTop from '../../../assets/diskt.png';

import animations from "create-keyframe-animation";

import BarPlayer from './bar-player';

import {mapState} from 'vuex';

import SongKeys from './songKeys';

var aniMixin = {
    methods: {
        getPositionOffset(){
            var x1 = 80;
            var x2 = document.documentElement.offsetWidth / 2;
            var x = x2 - x1;

            var y1 = 60;
            var y2 = (document.documentElement.offsetHeight - 428) * 0.85 - 260 + 340;
            var y = y2 - y1;

            var scale = 80/360;

            return {x,y,scale};
        },
        enterAni(done){
            {
                var {x,y,scale} = this.getPositionOffset();
                var animation = {
                    0: {
                        transform: `translate(-${x}px, ${y}px) scale(${scale})`
                    },
                    60: {
                        transform: `translate(0,0) scale(1.1)`
                    },
                    100: {
                        transform: `translate(0,0) scale(1)`
                    }
                };
                animations.registerAnimation({
                    name: "cd-enter-ani",
                    animation: animation,
                    presets: {
                        duration: 300,
                        easing: "linear",
                    },
                });
                animations.runAnimation(this.$refs.disk, "cd-enter-ani", done);
            }
            {
                var animation = {
                    0: {
                        transform: 'translateY(-100%)'
                    },
                    100: {
                        transfrom: 'translateY(0)'
                    }
                };
                animations.registerAnimation({
                    name: "header-enter-ani",
                    animation: animation,
                    presets: {
                        duration: 300,
                        easing: "cubic-bezier(.81,.07,.73,1.61)",
                    }
                });
                animations.runAnimation(this.$refs.header, "header-enter-ani");
            }
            {
                var animation = {
                    0: {
                        transform: 'translateY(100%)'
                    },
                    100: {
                        transform: 'translateY(0)'
                    }
                };
                animations.registerAnimation({
                    name: "footer-enter-ani",
                    animation: animation,
                    presets: {
                        durantion: 300,
                        easing: "cubic-bezier(.81,.07,.73,1.61)",
                    }
                });
                animations.runAnimation(this.$refs.footer, "footer-enter-ani");
            }
        },
        afterEnter(){
            animations.unregisterAnimation("cd-enter-ani");
            animations.unregisterAnimation("header-enter-ani");
            animations.unregisterAnimation("footer-enter-ani");
            this.$refs.disk.style.animation = "";
            this.$refs.header.style.animation = "";
            this.$refs.footer.style.animation = "";
        },
        leaveAni(done){
            var {x,y,scale} = this.getPositionOffset();
            var animation = {
                0: {
                    transform: `translate(0,0) scale(1)`
                },
                60: {
                    transform: `translate(0,0) scale(1.1)`
                },
                100: {
                    transform: `translate(-${x}px, ${y}px) scale(${scale})`
                }
            };
            animations.registerAnimation({
                name: "disk-leave-ani",
                animation: animation,
                presets: {
                    duration: 300,
                    easingL: "linear"
                }
            });
            animations.runAnimation(this.$refs.disk, "disk-leave-ani", done);

        }
    }
}
export default {
    components: {
        BarPlayer,
        SongKeys
    },
    props: {
        data: Object,
        playList: Array,
        isPlay: Boolean,
        value: Number
    },
    mixins: [aniMixin],
    filters: {
        timeF(val){
            val = Math.floor(val);
            var mm = Math.floor(val / 60) ;
            var ss = val % 60;
            if(mm < 10){
                mm = '0' + mm;
            }
            if(ss < 10){
                ss = '0' + ss;
            }
            return mm + ':' + ss ;
        }
    },
    data(){
        return {
            disk,
            diskTop,
            speed: [ 0.75, 1, 1.25, 1.5, 2 ],
            chooseSpeed: 1,
            playSort: ['icon-shunxubofang', 'icon-suiji', 'icon-danquxunhuan1'],
            showKeys: false
        }
    },
    computed: {
        ...mapState({
            currentTime: state => state.player.currentTime,
            duration: state => state.player.duration,
            chooseSort: state => state.player.chooseSort
        })
    },
    methods: {
        choose(item){
            this.chooseSpeed = item;
        },
        dragAction(pro){
            this.$emit('drag',pro);
        },
        changeSortAction(){
            this.$store.commit('player/changeSort');
        },
        preAction(){
            this.$store.commit('player/changeIndex',0);
        },
        nextAction(){
            this.$store.commit('player/changeIndex',1);
        },
        showKeysAction(boo){
            this.showKeys = boo;
        },
        switchKeyAction(item){
            this.$emit('switchKey',item);
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../../assets/global-style.scss';
.normal-player{
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgb(242, 243, 244);
    .bgimg{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        .img{
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            filter: blur(0.2rem);
            opacity: 0.6;
            z-index: -1;
        }
        .mask1{
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.7;
        }
        .mask2{
            position: absolute;
            top: 0;
            left: 0;
            z-index: -1;
            width: 100%;
            height: 100%;
            background: #fff;
            opacity: 0.3;
        }
    }
    header{
        width: 100%;
        height: 0.44rem;
        position: absolute;
        top: 0;
        left: 0;
        border-bottom: 1px solid $border-color;
        display: flex;
        align-items: center;
        .icon{
            width: 0.42rem;
            height: 0.42rem;
            text-align: center;
            line-height: 0.42rem;
            transform: rotate(90deg);
            margin-left: 0.05rem;
            margin-right: 0.05rem;
            .iconfont{
                font-size: 0.24rem;
                color: $font-color-desc;
            }
        }
        .msg{
            flex: 1;
            height: 100%;
            padding-top: 0.05rem;
            padding-bottom: 0.05rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: calc(100% - 0.52rem);
            h3{
                width: 100%;
                font-size: 0.16rem;
                color: $font-color-desc;
                line-height: 0.16rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            h4{
                width: 100%;
                font-size: 0.14rem;
                color: $font-color-desc-v2;
                line-height: 0.14rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
    main{
        position: absolute;
        top: 0.44rem;
        bottom: 1.7rem;
        left: 0;
        right: 0;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: center;
        .disk-wrap{
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .diskTop{
            width: 0.94rem;
            height: 1.5rem;
            position: absolute;
            top: -0.18rem;
            left: 1.85rem;
            transform: rotate(-30deg);
            transform-origin: 20px 20px;
            transition: all 300ms linear;
            z-index: 9;
            img{
                height: 100%;
            }
            &.play{
                transform: rotate(0);
            }
        }
        .disk{
            width: 2.6rem;
            height: 2.6rem;
            background-size: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 15%;
            img{
                width: 1.78rem;
                height: 1.78rem;
                border-radius: 50%;
            }
            &.play{
                animation: cd-rotate 20s linear infinite running;
            }
            &.pause{
                animation-play-state: paused;
            }

        }
    }
    footer{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 1.7rem;
        .speed{
            height: 0.3rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            span{
                font-size: 0.14rem;
                padding:  0.05rem;
                line-height: 0.14rem;
                color: $font-color-desc-v2;
                border: 1px solid transparent;
                border-radius: 0.08rem;
                margin: 0 0.02rem;
                &.choose{
                    border-color: $theme-color;
                    color: $theme-color;
                }
            }
        }
        .control-bar{
            width: 100%;
            height: 0.3rem;
            margin: 0.1rem 0;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                width: 0.4rem;
                font-size: 0.12rem;
                color: $font-color-desc-v2;
                margin: 0 0.1rem;
            }
        }
        .control-btn{
            width: 100%;
            height: 0.4rem;
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding:  0 0.1rem;
            position: relative;
            .iconfont{
                font-size: 0.3rem;
                color: #333;
                &:nth-of-type(3){
                    font-size: 0.4rem;
                }
            }
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