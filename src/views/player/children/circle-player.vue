<template>
  <canvas class="canvas" ref="canvas" ></canvas>
</template>

<script>
import {mapState} from 'vuex';
export default {
    props: {
        
    },
    data(){
        return {
            width: document.documentElement.offsetWidth/750*60,
            height: document.documentElement.offsetWidth/750*60 
        }
    },
    computed: {
        ...mapState({
            progress: state => state.player.progress,
        })
    },
    watch: {
        progress(newVal){
            this.ctx.clearRect(0,0,this.width,this.height);
            this.fullBgCircle();
            this.fillRealCircle(newVal);
        }
    },
    methods: {
        fullBgCircle(){
            var ctx = this.ctx;

            var x = this.width/2;
            var y = this.height/2;
            var r1 = this.width/2 * 0.9;
            var r2 = r1 - 5;

            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.arc(x, y, r1, Math.PI * 2, false);
            ctx.lineTo(x,y);

            ctx.moveTo(x,y);
            ctx.arc(x, y, r2, Math.PI * 2, false);
            ctx.lineTo(x,y);
            ctx.fillStyle = 'rgba(212, 68, 57, 0.5)';
            ctx.fill('evenodd');
            ctx.closePath();
        },
        fillRealCircle(val){
            var ctx = this.ctx;

            var x = this.width/2;
            var y = this.height/2;
            var r1 = this.width/2 * 0.9;
            var r2 = r1 - 5;
            var fillDeg = 360*val;
            ctx.beginPath();
            ctx.moveTo(x,y);
            ctx.arc(x, y, r1, Math.PI/180 * -90, Math.PI/180 * (-90 + fillDeg) , false );
            ctx.lineTo(x,y);

            ctx.moveTo(x,y);
            ctx.arc(x, y, r2, Math.PI/180 * -90, Math.PI/180 * (-90 + fillDeg), false);
            ctx.lineTo(x,y);
            ctx.fillStyle = 'rgb(212, 68, 57)';
            ctx.fill('evenodd');
            ctx.closePath();
        }
    },
    mounted(){
        var cvs = this.$refs.canvas;
        cvs.width = this.width;
        cvs.height =this.height;
        this.ctx = cvs.getContext('2d');

        this.ctx.clearRect(0,0,this.width,this.height);
        this.fullBgCircle();
        this.fillRealCircle(this.progress);
    }
}
</script>

<style scoped lang="scss" >
#canvas{
    display: block;
}

</style>