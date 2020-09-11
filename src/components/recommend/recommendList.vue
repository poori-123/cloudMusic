<template>
  <div class="recommendList">
      <h3>推荐歌单</h3>
      <ul>
          <li v-for="item in recommendList">
              <div class="imgbox">
                  <img alt="" v-lazy="item.picUrl">
                  <div class="mask"></div>
                  <p>
                      <span class="iconfont icon-headset"></span>
                      <span>{{item.playCount | peopleNum}}</span>
                  </p>
              </div>
              <h4 class="van-multi-ellipsis--l2">{{item.name}}</h4>
          </li>
      </ul>
  </div>
</template>

<script>
import loadImg from '../../assets/music.png'
import Vue from 'vue';
import { Lazyload } from 'vant';
Vue.use(Lazyload, {
  lazyComponent: true,
  loading: loadImg
});

export default {
    filters: {
        peopleNum(num){
            if(num < 1000){
                return num + '人';
            }else if(num >= 0 && num < 10000){
                return (num/10000).toFixed(1) + '万';
            }else if(num >= 10000){
                return Math.floor(num/10000) + '万';
            }
        }
    },
    props: {
        recommendList: Array
    }
}
</script>

<style lang="scss">
    .recommendList{
        width: 100%;
        h3{
            height: 0.6rem;
            padding-left: 0.1rem;
            line-height: 0.6rem;
            font-size: 0.14rem;
            font-weight: 800;
            color: #333;
        }
        ul{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            li{
                width: 32%;
                .imgbox{
                    position: relative;
                    width: 100%;
                    height: 1.2rem;
                    border-radius: 0.04rem;
                    overflow: hidden;
                    img{
                        width: 100%;
                        height: 100%;
                    }
                    .mask{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 0.35rem;
                        background: linear-gradient(rgba(110, 110, 110, 0.4), rgba(255, 255, 255, 0));
                    }
                    p{
                        position: absolute;
                        top: 0.02rem;
                        right: 0.04rem;
                        color: #f1f1f1;
                        display: flex;
                        align-items: center;
                        .iconfont{
                            font-size: 0.16rem;
                        }
                        span{
                            font-size: 0.12rem;
                        }
                    }
                }
                h4{
                    height: 0.36rem;
                    width: 100%;
                    padding:  0 0.02rem;
                    font-size: 0.12rem;
                    color: #333;
                    line-height: 0.18rem;
                    margin-bottom: 0.14rem;
                }
            }
        }
    }

</style>