<template>
  <div class="subpage page" id="singerSongs">
      <div v-if="loadOver" class="loading">
        <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
      </div>
      <div class="wrap" v-if="!loadOver">
        <header>
          <span 
          class="iconfont icon-fanhui"
          @click="$router.back()"></span>
          <div class="tit">
            <span>{{artist.name}}</span>
          </div>
        </header>
        <div class="bgimg" 
          :style="{ transform: `scale(${scale})`, 
                    'background-image': `url(${artist.picUrl})` }" 
          ref="bgimg">
          <div class="mask"></div>
        </div>
        <app-scroll class="scroll" :scrollAction="scrollAction">
          <div class="collect" :style="{ opacity: opacity }" >
            <span class="iconfont icon-tianjia">收藏</span>
          </div>
          <Songs :data="singerSongs" />
        </app-scroll>
      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);

import {mapState} from 'vuex';

import Songs from '../components/songList/songs';
export default {
  components: {
    Songs
  },
  data(){
    return {
      scale: 1,
      opacity: 1
    }
  },
  computed: {
      ...mapState({
          singerSongs: state => state.singers.singerSongs,
          loadOver: state => state.singers.inloadSingerSongs,
          artist: state => state.singers.artist
      })
  },
  methods: {
    scrollAction({y}){
      if( y >= 0 ){
        var h = this.$refs.bgimg.offsetHeight;
        this.scale = ( h + y ) / h;
      }else if ( y < 0 ){
        this.opacity = 1 - (-1*y)/300;
      }
    }
  },
  created(){
      var id = this.$route.params.id;
      this.$store.dispatch('singers/getSingerSongs',{id})
  }
}
</script>

<style lang="scss" scoped >
@import '../assets/global-style.scss';
#singerSongs{
  .loading{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .van-loading__text{
      font-size: 0.16rem;
      margin-left: 0.2rem;
      color: #333;
    }
  }
  .wrap{
    width: 100%;
    height: 100%;
  }
  header{
    width: 100%;
    height: 0.44rem;
    padding-bottom: 0.05rem;
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    background: linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0));
    .iconfont{
      font-size: 0.2rem;
      color: $font-color-light;
      margin: 0 0.05rem 0 0.1rem;
      font-weight: 700;
    }
    .tit{
      flex: 1;
      overflow: hidden;
      span{
        font-size: 0.16rem;
        color: $font-color-light;
        font-weight: 700;
      }
    }
  }
  .bgimg{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    height: 3rem;
    z-index: 1;
    transform-origin: top center;
    background-position: center;
    background-size: cover;
    .mask{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.3);
    }
  }
  .scroll{
    position: absolute;
    top: 0.44rem;
    bottom: 0;
    width: 100%;
    overflow: hidden;
    z-index: 19;
    .collect{
      width: 1.2rem;
      height: 0.4rem;
      background: $theme-color;
      border-radius: 0.2rem;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      margin-bottom: 0.1rem;
      margin-top: 1.82rem;
      .iconfont{
        font-size: 0.14rem;
        color: $font-color-light;
        letter-spacing: 0.05rem;
        line-height: 0.4rem;
        display: flex;
        align-items: center;
        &::before{
          font-size: 0.12rem;
          margin-right: 0.05rem;
        }
      }
    }
  }
}
</style>