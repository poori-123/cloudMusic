<template>
  <div class="songs">
    <div class="top">
        <div class="all">
            <span class="iconfont icon-bofang"></span>
            <span>播放全部 <i>(共{{data.length}}首)</i></span>
        </div>
        
        <div class="btn">
            <span class="iconfont icon-tianjia"></span>
            <i>收藏({{num | peopleNum(1)}})</i>
        </div>
    </div>
    <ul class="list">
        <li v-for="(item,index) in data" :key="item.id">
            <span>{{index+1}}</span>
            <div>
                <h3>{{item.name}}</h3>
                <h4>{{item.ar.map(arItem=>arItem.name).join('/')}} - {{item.al.name}}</h4>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        data: Array,
        num: Number
    },
    mounted(){

    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global-style.scss';
.songs{
    width: 100%;
    background: #fff;
    border-radius: 0.1rem;
    .top{
        height: 0.46rem;
        padding: 0.1rem 0;
        margin-left: 0.1rem;
        border-bottom: 1px solid $border-color;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .all{
            display: flex;
            align-items: center;
            .iconfont{
                font-size: 0.24rem;
                margin-right: 0.1rem;
            }
            span:nth-child(2){
                font-size: 0.16rem;
                color: #333;
                display: flex;
                align-items: flex-end;
                i{
                    font-size: 0.12rem;
                    color: $font-color-desc-v2;
                    margin-left: 0.03rem;
                }
            }
        }
        .btn{
            width: 1.3rem;
            height: 0.46rem;
            background: $theme-color;
            border-radius: 0.05rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span{
                font-size: 0.12rem;
                color: $font-color-light;
                margin-right: 0.06rem;
            }
            i{
                font-size: 0.14rem;
                color: $font-color-light;
                line-height: 0.16rem;
            }
        }
    }
    .list{
        width: 100%;
        li{
            width: 100%;
            height: 0.6rem;
            display: flex;
            span{
                width: 0.6rem;
                height: 0.6rem;
                line-height: 0.6rem;
                text-align: center;
                font-size: 0.16rem;
                color: #333;
            }
            div{
                width: calc(100% - 0.6rem);
                height: 0.6rem;
                padding:  0.08rem 0;
                border-bottom: 1px solid $border-color;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                h3{
                    font-size: 0.16rem;
                    color: #333;
                    width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                h4{
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