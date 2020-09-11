<template>
    <div class="banner">
        <van-swipe class="my-swipe" :autoplay="3000">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                <!-- <a :href="item.url"> -->
                    <!-- <img :src="item.imageUrl" alt=""> -->
                <!-- </a> -->
                <div :style="{ backgroundImage: 'url(' + item.imageUrl +')'}" class="img"></div>
            </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
/* 引入vant轮播图插件 */
import Vue from 'vue'
import { Swipe, SwipeItem } from 'vant'
Vue.use(Swipe)
Vue.use(SwipeItem)

export default {
    props: {
        bannerList: Array
    }
    
}
</script>

<style lang="scss">
    @import '../../assets/global-style.scss';
    .banner{
        width: 100%;
        height: 1.6rem;
        position: relative;
        &::before{
            content: '';
            position: absolute;
            bottom: 40%;
            left: 0;
            width: 100%;
            height: 10rem;
            background: $theme-color;
        }
        .my-swipe{
            width: 98%;
            height: 100%;
            margin: 0 auto;
            border-radius: 0.06rem;
            overflow: hidden;
            img{
                height: 100%;
            }
            .img{
                width: 100%;
                height: 100%;
                background-position: center;
                background-size: cover;
                background-repeat: no-repeat;
            }
            .van-swipe__indicator{
                width: 0.08rem;
                height: 0.08rem;
                margin: 0 0.04rem;
                transition: all 0s;
            }
            .van-swipe__indicator--active{
                background: $theme-color;
            }
            .van-swipe__track{
                width: 100%;
                height: 100%;

            }
        }
    }
</style>