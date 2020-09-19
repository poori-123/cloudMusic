<template>
  <div 
    class="bar-player" 
    ref="bar"
    @touchstart.stop="touchstart"
>
      <div class="bar" :style="{'width': pro*100 + '%'}" ></div>
      <div class="point" :style="{'left': pro*100 + '%'}"></div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: {
        
    },
    data(){
        return {
            pro: 0,
            isDrag: false
        }
    },
    computed: {
        ...mapState({
            progress: state => state.player.progress
        })
    },
    watch: {
        progress(newVal){
            if(this.isDrag){
                return;
            }
            this.pro = this.progress
        }
    },
    methods:{
        touchstart(ev){
            this.isDrag = true;
            var w = this.$refs.bar.offsetWidth;
            var l = this.$refs.bar.offsetLeft;
            var fx = ev.changedTouches[0].clientX - l;
            this.pro = fx/w;

            document.ontouchmove = (e) => {
                var sx = e.changedTouches[0].clientX - l;
                if( sx < 0 || sx > w ){
                    return;
                }
                this.pro = sx/w;
            }
            document.ontouchend = () => {
                if(this.isDrag){
                    this.isDrag = false;
                    this.$emit('drag',this.pro);
                    document.ontouchmove = null;
                }
            }
            document.ontouchcancel = () => {
                if(this.isDrag){
                    this.isDrag = false;
                    this.$emit('drag',this.pro);
                    document.ontouchmove = null;
                }
            }
        }
    },
}
</script>

<style scoped lang="scss" >
.bar-player{
    width: 60%;
    height: 0.04rem;
    background: rgba(0, 0, 0, 0.3);
    position: relative;
    &::before{
        content: '';
        position: absolute;
        width: 100%;
        height: 200%;
        top: -50%;
    }
    .bar{
        position: absolute;
        height: 100%;
        width: 0;
        top: 0;
        left: 0;
        background: rgb(212, 68, 57);
    }
    .point{
        position: absolute;
        top: 0;
        left: 0;
        width: 0.16rem;
        height: 0.16rem;
        border: 0.03rem solid #fff;
        background: rgb(212, 68, 57);
        border-radius: 50%;
        transform: translate(-50%,-0.06rem);
    }
}
</style>