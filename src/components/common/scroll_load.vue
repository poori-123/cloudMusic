<template>
    <div class="scroll-box" ref="scroll_box">
        <div class="scroll-wrap">
            <div class="pull-down">
                <img :src="pull_down_img" alt="" :class="{'turn': isTurn}">
                <span>{{ pull_down_text }}</span>
            </div>
            <slot/>
        </div>
    </div>
</template>

<script>
import arrow from '../../assets/arrow.jpg';
import load from '../../assets/loading.gif';
export default {
    props: {
        scrollX: {
            type: Boolean,
            default: false
        },
        inReload: Boolean
    },
    data(){
        return {
            pull_down_text: '下拉重新加载...',
            pull_down_img: arrow,
            isTurn: false,
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
        })
    },
    watch: {
        inReload(newVal){
            if(!newVal){
                this.pull_down_img = arrow;
                this.scroll.scrollTo(0,-100,300);
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.scroll-box{
    overflow: hidden;
    .pull-down{
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