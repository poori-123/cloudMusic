<template>
  <div class="search-list" v-if="!loading">
    <app-scroll class="scroll">
      <div class="singer topList" v-if="suggestList.artists">
        <h3>相关歌手</h3>
        <li v-for="item in suggestList.artists" :key="item.id" @click="singerAction(item.id)" >
          <img :src="item.picUrl" alt="">
          <p>歌手: {{item.name}}</p>
        </li>
      </div>
      <div class="arts topList" v-if="suggestList.playlists">
        <h3>相关歌单</h3>
        <li v-for="item in suggestList.playlists" :key="item.id" @click="playAction(item.id)">
          <img :src="item.coverImgUrl" alt="">
          <p>歌手: {{item.name}}</p>
        </li>
      </div>
      <ul class="list">
        <li v-for="(item,index) in searchList" :key="index" @click="playSongAction(item)" >
          <h4>{{item.name}}</h4>
          <h5>{{item.ar.map( ar => ar.name ).join('/')}} - {{item.al.name}}</h5>
        </li>
      </ul>
    </app-scroll>
  </div>
</template>

<script>
export default {
  props: {
    suggestList: Object,
    searchList: Array,
    loading: Boolean
  },
  data(){
    return {
      handleLoading: true,
    }
  },
  methods: {
    singerAction(id){
      this.$router.push({
        name: 'searchSingers',
        params: {
            id
        }
      });
    },
    playAction(id){
      this.$router.push({
        name: 'searchSongs',
        params: {
            id
        }
      });
    },
    playSongAction(item){
      console.log(item)
      this.$store.commit('player/setShowAudio',{ list: [item], index: 0 });
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global-style.scss';
.search-list{
  width: 100%;
  height: 100%;
  .scroll{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .topList{
      width: 100%;
      h3{
        padding: 0.1rem;
        font-size: 0.12rem;
        color: #333;
        line-height: 0.12rem;
      }
      li{
        margin: 0 0.05rem;
        padding: 0.05rem 0;
        height: 0.62rem;
        border-bottom: 1px solid $border-color;
        display: flex;
        align-items: center;
        img{
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 0.05rem;
          margin-right: 0.2rem;
        }
        p{
          font-size: 0.14rem;
          color: #333;
          width: calc(100% - 0.5rem);
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    } 
    .list{
      padding-left: 0.2rem;
      li{
        padding: 0.05rem 0;
        height: 0.6rem;
        border-bottom: 1px solid $border-color;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        h4{
          font-size: 0.16rem;
          color: $font-color-desc;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        h5{
          font-size: 0.12rem;
          color: $font-color-desc-v2;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>