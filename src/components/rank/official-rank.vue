<template>
  <div class="rank-child official">
      <h2>官方榜</h2>
      <ul>
        <li v-for="item in officialList" :key="item.id" @click="pushAction(item)">
          <div class="imgbox">
            <img v-lazy="item.coverImgUrl"  alt="">
            <div class="mask"></div>
            <span>{{item.updateFrequency}}</span>
          </div>
          <div class="songsList">
            <p v-for="(song,index) in item.tracks" :key="index">
              {{index+1}}.{{song.first}} - {{song.second}}
            </p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    officialList: Array
  },
  methods: {
    pushAction(item){
        this.$router.push({
            name: 'rankSongList',
            params: {
                id: item.id
            }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global-style.scss';
.official{
  width: 100%;
  overflow: hidden;
  h2{
    height: 0.3rem;
    padding-top: 0.1rem;
    line-height: 0.2rem;
    font-size: 0.14rem;
    font-weight: 800;
    margin: 0.1rem 0.05rem;
  }
  ul{
    width: 100%;
    padding: 0 0.05rem;
    li{
      width: 100%;
      padding: 0.03rem 0;
      border-bottom: 0.01rem solid $border-color;
      display: flex;
      .imgbox{
        width: 1rem;
        height: 1rem;
        position: relative;
        border-radius: 0.04rem;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          position: absolute;
          bottom: 0.06rem;
          left: 0.06rem;
          color: #f1f1f1;
          z-index: 9;
          font-size: 0.12rem;
        }
        .mask{
          position: absolute;
          bottom: 0;
          height: 0.35rem;
          width: 100%;
          background: linear-gradient(rgba(255, 255, 255, 0), rgba(110, 110, 110, 0.4));
        }
      }
      .songsList{
        padding: 0.1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        width: calc( 100% - 1rem);
        p{
          width: 100%;
          line-height: 0.12rem;
          font-size: 0.12rem;
          color: #808080;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>