<template>
  <div class="global">
      <h2>全球榜</h2>
      <ul>
        <li v-for="item in globalList" :key="item.id">
          <img v-lazy="item.coverImgUrl" alt="">
          <div class="mask"></div>
          <span>{{item.updateFrequency}}</span>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: {
    globalList: Array
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global-style.scss';
.global{
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
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.05rem;
    width: 100%;
    justify-content: space-between;
    li{
      width: 1.2rem;
      height: 1.2rem;
      padding: 0.03rem 0;
      border-bottom: 0.01rem solid $border-color;
      box-sizing: content-box;
      position: relative;
      img{
        width: 100%;
        height: 100%;
        border-radius: 0.04rem;
      }
      span{
        position: absolute;
        bottom: 0.07rem;
        left: 0.07rem;
        color: #f1f1f1;
        font-size: 0.12rem;
      }
      .mask{
        position: absolute;
        bottom: 0.03rem;
        height: 0.35rem;
        width: 100%;
        background: linear-gradient(rgba(255, 255, 255, 0), rgba(110, 110, 110, 0.4));
      }
    }
  }
}
</style>