<template>
    <div class="page subpage" id="songList">
      <div v-if="!loadOver" class="loading">
        <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
      </div>

      <div v-if="loadOver">
        <header>
          <div class="mask" ref="mask"></div>
          <span 
          class="iconfont icon-fanhui"
          @click="$router.back()"></span>
          <div class="tit">
            <span v-if="!isScroll">歌单</span>
            <span v-if="isScroll" class="runText">{{songList.name}}</span>
          </div>
        </header>
        <app-scroll class="scroll" :scrollAction="scrollAction" >
          <div class="top">
            <div class="filter">
              <img :src="songList.coverImgUrl" alt="">
            </div>
            <div class="info">
              <div class="imgbox">
                <img :src="songList.coverImgUrl" alt="">
                <div class="imgMask"></div>
                <span class="iconfont icon-headset">{{songList.subscribedCount | peopleNum(1)}}</span>
              </div>
              <div class="name">
                <h3>{{songList.name}}</h3>
                <h4>
                  <img :src="songList.creator.avatarUrl" alt="">
                  <span>{{songList.creator.nickname}}</span>
                </h4>
              </div>
            </div>
            <div class="handler">
              <span class="iconfont icon-pinglun">评论</span>
              <span class="iconfont icon-xihuan1">点赞</span>
              <span class="iconfont icon-tianjia">收藏</span>
              <span class="iconfont icon-youcecaidan">更多</span>
            </div>
          </div>
          <Songs :data="songList.tracks" :num="songList.subscribedCount" />
        </app-scroll>
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex';

import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);

import Songs from '../components/songList/songs';

export default {
  components: {
    Songs
  },
  data(){
    return {
      isScroll: false
    }
  },
  computed: {
    ...mapState({
      songList: state => state.songList.songList,
      loadOver: state => state.songList.getSongList
    })
  },
  methods: {
    scrollAction({y, scroll}){
      if( y >= 0 ){
        scroll.scrollTo(0,0,0);
        return false;
      }else if( y < -50 && y >= -250 ){
        var op = Math.abs( y+50 )/200;
        this.$refs.mask.style.opacity = op;
        this.isScroll = true;
      }else if(y >= -50 && y < 0){
        this.$refs.mask.style.opacity = 0;
        this.isScroll = false;
      }
    }
  },
  created(){
    var id = this.$route.params.id;
    this.$store.dispatch('songList/getSongList',{id});
  }
}
</script>

<style scoped lang="scss">
@import '../assets/global-style.scss';
#songList{
  header{
    width: 100%;
    height: 0.44rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 9;
    display: flex;
    align-items: center;
    .mask{
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: $theme-color;
      z-index: -1;
      opacity: 0;
    }
    .iconfont{
      font-size: 0.2rem;
      color: $font-color-light;
      margin: 0 0.05rem 0 0.1rem;
    }
    .tit{
      flex: 1;
      overflow: hidden;
      span{
        font-size: 0.16rem;
        color: $font-color-light;
      }
    }
  }
  .scroll{
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }
  .top{
    width: 100%;
    height: 2.6rem;
    padding-top: 0.6rem;
    // overflow: hidden;
    position: relative;
    .filter{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 120%;
      z-index: -1;
      filter: blur(0.2rem);
      img{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 110%;
      }
    }
    .info{
      width: 100%;
      height: 1.2rem;
      display: flex;
      padding:  0 0.2rem;
      .imgbox{
        width: 1.2rem;
        height: 1.2rem;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .imgMask{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 0.35rem;
          background: linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0));
        }
        .iconfont{
          position: absolute;
          top: 0.01rem;
          right: 0.03rem;
          color: #fff;
          font-size: 0.12rem;
          display: flex;
          align-items: center;
          &::before{
            font-size: 0.16rem;
          }
        }
      }
      .name{
        flex: 1;
        padding: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        h3{
          font-size: 0.16rem;
          color: #fff;
          font-weight: 700;
        }
        h4{
          display: flex;
          align-items: center;
          img{
            width: 0.2rem;
            height: 0.2rem;
            margin-right: 0.05rem;
            border-radius: 50%;
          }
          span{
            font-size: 0.14rem;
            color: $font-color-desc-v2;
          }
        }
      }
    }
    .handler{
      margin-top: 0.1rem;
      width: 100%;
      height: 0.6rem;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span{
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $font-color-light;
        font-size: 0.12rem;
        &::before{
          font-size: 0.2rem;
          margin-bottom: 0.03rem;
        }
      }
    }
  }

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
}
@keyframes runText{
  0%{
    transform: translateX(100%);
  }
  100%{
    transform: translateX(-100%);
  }
}
.runText{
  display: block;
  animation: runText 8s linear infinite;
}

</style>