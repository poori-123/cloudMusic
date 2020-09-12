<template>
    <div class="scroll-box" ref="scroll_box">
        <div class="scroll-wrap">
            <div class="pull-down">
                <img :src="pull_down_img" alt="" :class="{'turn': isTurn}">
                <span>{{ pull_down_text }}</span>
            </div>
            <slot/>
            <div class="pull-up">
                <img :src="pull_down_img" alt="" :class="{'turn': !isTurn}">
                <span>{{ pull_up_text }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import arrow from '../../assets/arrow.jpg';
import load from '../../assets/loading.gif';
import noMore from '../../assets/music.png'
export default {
    props: {
        scrollX: {
            type: Boolean,
            default: false
        },
        inReload: Boolean,
        inLoadMore: Boolean,
        maxNum: Boolean
    },
    data(){
        return {
            pull_down_text: '下拉重新加载...',
            pull_down_img: arrow,
            isTurn: false,
            pull_up_text: '上拉加载更多...'
        }
    },
    mounted(){
        this.scroll = new IScroll(this.$refs.scroll_box,{
            click: true,
            tap: true,
            probeType: 3,
            scrollX: this.scrollX,
            scrollY: !this.scrollX
        });
        this.scroll.scrollTo(0,-100,0);
        this.scroll.on( 'beforeScrollStart' , () => {
            this.scroll.refresh();
        });

        /* 下拉刷新 */
        this.scroll.on( 'scroll', () => {
            if(this.inReload){
                return;
            }
            if(this.scroll.y >= 0){
                this.pull_down_text = '松手重新加载...';
                this.isTurn = true;
            }else if(this.scroll.y < 0 && this.scroll.y > -100){
                this.pull_down_text = '下拉重新加载...';
                this.isTurn = false;
            }
        });
        this.scroll.on( 'scrollEnd', () => {
            if(this.inReload){
                return;
            }
            if(this.scroll.y >= 0){
                this.pull_down_text = '正在重新加载...';
                this.pull_down_img = load;
                this.$emit('reload');
            }else if(this.scroll.y < 0 && this.scroll.y > -100){
                this.scroll.scrollTo(0,-100,300);
            }
        });

        /* 上拉加载更多 */
        this.scroll.on( 'scroll', () => {
            if(this.inLoadMore || this.maxNum){
                return;
            }
            if( this.scroll.y <= this.scroll.maxScrollY){
                this.pull_up_text = '松手加载更多...';
                this.isTurn = true;
            }else if( this.scroll.y > this.scroll.maxScrollY && this.scroll.y < (this.scroll.maxScrollY + 100) ){
                this.pull_up_text = '上拉加载更多...';
                this.isTurn = false;
            }
        });
        this.scroll.on('scrollEnd', () => {
            if(this.inLoadMore || this.maxNum){
                return;
            }
            if( this.scroll.y > this.scroll.maxScrollY && this.scroll.y < (this.scroll.maxScrollY + 100) ){
                this.scroll.scrollTo(0, (this.scroll.maxScrollY + 100), 300);
            }else if( this.scroll.y <= this.scroll.maxScrollY ){
                this.pull_up_text = '正在加载更多...';
                this.pull_down_img = load;
                this.$emit('loadMore');
            }
        })

    },
    watch: {
        inReload(newVal){
            if(!newVal){
                this.pull_down_img = arrow;
                this.scroll.scrollTo(0,-100,300);
            }
        },
        inLoadMore(newVal){
            if(!newVal){
                this.pull_down_img = arrow;
                this.pull_up_text = '上拉加载更多...';
            }
        },
        maxNum(newVal){
            if(newVal){
                this.pull_down_img = noMore;
                this.pull_up_text = '没有更多了...';
            }else{
                this.pull_down_img = arrow;
                this.pull_up_text = '上拉加载更多...';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-box{
    overflow: hidden;
    .pull-down,.pull-up{
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        // border: 2px solid #000;
        img{
            width: 0.3rem;
            height: 0.3rem;
            transition: all 300ms;
        }
        .turn{
            transform: rotate(180deg);
        }
        span{
            font-size: 0.14rem;
            color: #333;
            margin-left: 0.1rem;
        }
    }
}
</style>