<template>
  <div id="recommend" class="page">
    <div v-if="!loadOver" class="loading">
      <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
    </div>
    <app-scroll class="scroll" v-if="loadOver">
      <BannerList :bannerList="bannerList" />
      <RecommendList :recommendList="recommendList" />
    </app-scroll>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import BannerList from '../components/recommend/bannerList';
import RecommendList from '../components/recommend/recommendList';
// import appScroll from '../components/common/scroll';

import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);

export default {
  components: {
    BannerList,
    RecommendList,
    // appScroll
  },
  computed: {
    loadOver(){
      return this.$store.getters['recommend/loadOver']
    },
    ...mapState({
        bannerList: state => state.recommend.bannerList,
        recommendList: state => state.recommend.recommendList
    })
  },
  created(){
      this.$store.dispatch('recommend/getBannerList');
      this.$store.dispatch('recommend/getRecommendList');
  }
}
</script>

<style lang="scss">
#recommend .scroll{
  width: 100%;
  height: 100%;
  overflow: hidden;
}
#recommend .loading{
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
</style>