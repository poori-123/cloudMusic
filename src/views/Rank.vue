<template>
  <div id="rank" class="page">
    <div v-if="!loadOver" class="loading">
      <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
    </div>
    <appScroll class="content" v-if="loadOver">
      <officialRank :officialList="officialList" />
      <globalRank :globalList="globalList" />
    </appScroll>
  </div>
</template>

<script>
import officialRank from '../components/rank/official-rank';
import globalRank from '../components/rank/global-rank';

import { mapState } from 'vuex';

import Vue from 'vue';

import { Loading } from 'vant';
Vue.use(Loading);


export default {
  components: {
    officialRank,
    globalRank,
  },
  computed: {
    ...mapState({
      officialList: state => state.rank.officialList,
      globalList: state => state.rank.globalList,
      loadOver: state => state.rank.loadOver
    })
  },
  created(){
    this.$store.dispatch('rank/loadRank');
  }

}
</script>

<style lang="scss">
#rank .content{
  width: 100%;
  height: 100%;
}
#rank .loading{
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
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