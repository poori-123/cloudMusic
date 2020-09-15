<template>
  <div class="subpage page" id="singerSongs">
      <div v-if="loadOver" class="loading">
        <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
      </div>
      <div v-if="!loadOver">

      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { Loading } from 'vant';

Vue.use(Loading);

import {mapState} from 'vuex';
export default {
    computed: {
        ...mapState({
            singerSongs: state => state.singers.singerSongs,
            loadOver: state => state.singers.inloadSingerSongs,
            artist: state => state.singers.artist
        })
    },
    created(){
        var id = this.$route.params.id;
        this.$store.dispatch('singers/getSingerSongs',{id})
    }
}
</script>

<style lang="scss" scoped >
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
}
</style>