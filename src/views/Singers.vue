<template>
  <div id="singers" class="page">
      <div class="chooseArea">
        <app-scroll class="classify" :scrollX="true">
          <h3>分类(默认热门):</h3>
          <ul>
            <li 
              v-for="item in classify" 
              :key="item.id"
              @click="classifyChoose(item)"
              :class="{'active': classifyChoosed === item.id}">{{item.name}}</li>
          </ul>
        </app-scroll>
        <app-scroll class="initial" :scrollX="true">
          <h3>首字母:</h3>
          <ul>
            <li 
             v-for="num in 26" 
             :key="num"
             @click="initialChoose(num)"
             :class="{'active': initialChoosed === num}">{{String.fromCharCode( num + 64 )}}</li>
          </ul>
        </app-scroll>
      </div>
      <div v-if="!loadOver" class="loading">
        <van-loading size="0.4rem" color="#d44439">正在努力加载中...</van-loading>
      </div>
      <scrollLoad 
        class="singerList" 
        v-if="loadOver"
        :inReload = "inReload"
        @reload = "getDate">
        <ul>
          <li v-for="item in singerList" :key="item.id">
            <img v-lazy="item.img1v1Url" alt="">
            <h4>{{item.name}}</h4>
          </li>
        </ul>
      </scrollLoad>
  </div>
</template>

<script>
import Vue from 'vue';
import {mapState} from 'vuex';

import { Loading } from 'vant';
Vue.use(Loading);

import scrollLoad from '../components/common/scroll_load';

export default {
  components: {
    scrollLoad
  },
  data(){
    return {
      choose: {
        type: '',
        area: '',
        initial: '',
      },
      classify: [
        { id: '01', name: '华语男', type: 1, area: 7 },
        { id: '02', name: '华语女', type: 2, area: 7 },
        { id: '03', name: '华语组合', type: 3, area: 7 },
        { id: '04', name: '欧美男', type: 1, area: 96 },
        { id: '05', name: '欧美女', type: 2, area: 96 },
        { id: '06', name: '欧美组合', type: 3, area: 96 },
        { id: '07', name: '日本男', type: 1, area: 8 },
        { id: '08', name: '日本女', type: 2, area: 8 },
        { id: '09', name: '日本组合', type: 3, area: 8 },
        { id: '10', name: '韩国男', type: 1, area: 16 },
        { id: '11', name: '韩国女', type: 2, area: 16 },
        { id: '12', name: '韩国组合', type: 3, area: 16 },
        { id: '13', name: '其他男', type: 1, area: 0 },
        { id: '14', name: '其他女', type: 2, area: 0 },
        { id: '15', name: '其他组合', type: 3, area: 0 },
      ],
      page: 0,
      classifyChoosed: '',
      initialChoosed: null,
    }
  },
  computed: {
    ...mapState({
      singerList: state => state.singers.singerList,
      loadOver: state => state.singers.loadOver,
      inReload: state => state.singers.inReload,
    }),
  },
  methods: {
    classifyChoose(item){
      this.classifyChoosed = item.id;
      this.choose.type = item.type;
      this.choose.area = item.area;
      this.getDate();
    },
    initialChoose(num){
      this.initialChoosed = num;
      this.choose.initial = String.fromCharCode( num + 96 );
      this.getDate();
    },
    getDate(){
      this.page = 0;
      var payload = { ...this.choose, limit: 15 }
      this.$store.dispatch('singers/getSingerList', payload );
    },
    getMoreDate(){
      this.page++;
      var payload = { ...this.choose, offset: this.page*15, limit: 15 };
      this.$store.dispatch('singers/getMoreSingerList', payload );
    }
  },
  created(){
    this.$store.dispatch('singers/getTopSingerList');
  }
}
</script>

<style lang="scss">
  @import '../assets/global-style.scss';
  #singers{
    .chooseArea{
      width: 100%;
      height: 0.7rem;
      padding: 0.05rem;
      >div{
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        overflow: hidden;
        .scroll-wrap{
          overflow: hidden;
          display: flex;
          width: max-content;
          height: 0.3rem;
        }
        h3{
          color: #808080;
          font-size: 0.14rem;
        }
        ul{
          margin-left: 0.05rem;
          display: flex;
          align-items: center;
          width: max-content;
          li{
            padding: 0 0.05rem;
            color: #333;
            border: 1px solid transparent;
            border-radius: 0.1rem;
            font-size: 0.14rem;
            line-height: 0.25rem;
          }
          .active{
            color: $theme-color;
            border-color: $theme-color;
          }
        }
      }
    }
    .singerList{
      position: absolute;
      top: 0.7rem;
      bottom: 0;
      width: 100%;
      ul{
        li{
          margin-left: 0.05rem;
          margin-right: 0.05rem;
          padding-top: 0.05rem;
          padding-bottom: 0.05rem;
          display: flex;
          align-items: center;
          height: 0.6rem;
          border-bottom: 0.01rem solid $border-color;
          img{
            width: 0.5rem;
            height: 0.5rem;
            margin-right: 0.1rem;
          }
          h4{
            font-size: 0.14rem;
            color: #333;
          }
        }
      }
    }
    .loading{
      width: 100%;
      position: absolute;
      top: 0.7rem;
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
  }
</style>