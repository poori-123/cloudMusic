<template>
<transition enter-active-class="slide-in" leave-active-class="slide-out">
  <div id="search">
      <header>
          <span class="iconfont icon-fanhui" @click="$router.back()"></span>
          <input type="text" placeholder="搜索歌曲、歌手、专辑">
          <span class="iconfont icon-message-close" v-show="isSearch"></span>
      </header>
  </div>
</transition>
</template>

<script>
export default {
    data(){
        return {
            isSearch: false
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/global-style.scss';
#search{
    position: absolute;
    top: 0;
    height: 0;
    width: 100%;
    height: 100%;
    z-index: 9;
    background: $background-color;
    header{
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 0.4rem;
        background: $theme-color;
        display: flex;
        padding: 0 0.06rem;
        align-items: center;
        .icon-fanhui{
            font-size: 0.24rem;
            color: $font-color-light;
        }
        input{
            width: 3rem;
            height: 0.21rem;
            line-height: 0.2rem;
            border: 0;
            border-bottom: 0.01rem solid #fff;
            color: $font-color-light;
            font-size: 0.14rem;
            margin: 0 0.05rem;
            padding: 0;
            padding-left: 0.02rem;
            background: $theme-color;
            caret-color: $font-color-light;
            &::placeholder{
                font-size: 0.14rem;
                line-height: 0.2rem;
                color: $font-color-light;
            }
        }
        .icon-message-close{
            font-size: 0.16rem;
            color: $font-color-light;
        }
    }
}
@keyframes slide-in{
    0%{
        transform: translateX(100%);
    }
    100%{
        transform: translateX(0%);
    }
}
.slide-in{
    animation: slide-in 300ms ease-in;
}
.slide-out{
    animation: slide-in 300ms ease-in reverse;
}
</style>