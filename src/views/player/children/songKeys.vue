<template>
  <div class="songKeys" ref="songKeys" @click="$emit('showIF')">
      <ul>
          <li 
            v-for="(item,index) in songKeys" 
            :key="index" 
            @click.stop="switchAction(item)" 
            :class="{active: index === nowKey }"
            class="item"
            ref="item"
            >{{item.key}}</li>
      </ul>
  </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';
export default {
    props: {
        isShow: Boolean
    },
    computed:{
        ...mapState({
            songKeys: state => state.player.songKeys
        }),
        ...mapGetters({
            nowKey: 'player/nowKey'
        })
    },
    methods: {
        switchAction(item){
            this.$emit('switchKey',item);
        }
    },
    watch: {
        nowKey(newVal){
            if(!this.isShow){
                return;
            }
            this.scroll.refresh();
            var oh = newVal*this.itemHeight;
            var th = this.wrapHeight/2;
            var offset = th - oh;
            if(offset >= 0){
                offset = 0;
            }else if(offset <= this.scroll.maxScrollY){
                offset = this.scroll.maxScrollY;
            }
            this.scroll.scrollTo(0,offset,300);

        }
    },
    mounted(){
        this.scroll = new IScroll( this.$refs.songKeys,{
            tap: true,
            click: true
        } );
        this.scroll.on( 'beforeScrollStart' , () => {
            this.scroll.refresh();
        });
        this.wrapHeight = this.$refs.songKeys.offsetHeight;
        this.itemHeight = this.$refs.songKeys.querySelector('.item').offsetHeight;
    }
}
</script>

<style lang="scss" scoped >
.songKeys{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    ul{
        display: flex;
        flex-direction: column;
        align-items: center;
        li{
            display: inline-block;
            line-height: 0.3rem;
            font-size: 0.14rem;
            color: #999;
            min-width: 1.3rem;
            text-align: center;
            &.active{
                color: #eee;
            }
        }
    }
}
</style>