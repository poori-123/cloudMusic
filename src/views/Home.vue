<template>
  <div id="home">
    <header>
      <span class="iconfont icon-caidan"></span>
      <p>云音乐</p>
      <span class="iconfont icon-41" @click="$router.push('/search')"></span>
    </header>
    <nav>
      <router-link to="/recommend"><span>推荐</span></router-link>
      <router-link to="/singers"><span>歌手</span></router-link>
      <router-link to="/rank"><span>排行榜</span></router-link>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>

export default {
  
}
</script>

<style lang="scss" scoped>
@import '../assets/global-style.scss';
#home{
  width: 100%;
  height: 100%;
  position: relative;
  header{
    width: 100%;
    height: 0.5rem;
    padding: 0.05rem 0.1rem;
    background: $theme-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $font-color-light;
    line-height: 0.4rem;
    .iconfont{
      font-size: 0.25rem;
    }
    p{
      font-size: 0.2rem;
    }
  }
  nav{
    width: 100%;
    height: 0.44rem;
    display: flex;
    background: $theme-color;
    a{
      flex: 1;
      color: $font-color-light;
      font-size: 0.14rem;
      display: flex;
      span{
        margin: auto;
        border-bottom: 0.02rem solid transparent;
      }
    }
    .router-link-active span{
      border-bottom: 0.02rem solid $font-color-light;
    }
  }
}
</style>
