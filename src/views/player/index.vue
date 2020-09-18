<template>
  <div id="player">
      <transition enter-active-class="min-slide-in" leave-active-class="min-slide-out">
        <MiniPlayer 
            v-if="showAudio"
            v-show="!isShow" 
            :data="data"
            :playList="playList"
            :isPlay="isPlay" 
            @control="controlAction" 
            @show="showAction" 
        />
      </transition>
      <transition 
        enter-active-class="nor-faded-in" 
        leave-active-class="nor-faded-out"
        @enter="enterAction"
        @after-enter="afterEnterAction"
        @leave="leaveAction"
        >
        <NormalPlayer
            v-show="isShow" 
            :data="data"
            :playList="playList" 
            :isPlay="isPlay" 
            @control="controlAction" 
            @show="showAction" 
            ref="normalPlayer"
            :value="value"
            @drag="dragAction"
            @switchKey="switchKeyAction"
        />
      </transition>
      <audio ref="audio"></audio>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import MiniPlayer from './children/mini-player';
import NormalPlayer from './children/normal-player';
export default {
    components: {
        MiniPlayer,
        NormalPlayer
    },
    data(){
        return {
            isPlay: false,
            isShow: false,
            value: 0.5 //播放百分比
        }
    },
    computed: {
        ...mapState({
            showAudio: state => state.player.showAudio,
            playList: state => state.player.playList,  //歌曲列表
            playIndex: state => state.player.playIndex,  //播放下表
            duration: state => state.player.duration,
            currentTime: state => state.player.currentTime,
            chooseSort: state => state.player.chooseSort
        }),
        data(){
            return this.playList[this.playIndex];
        }
    },
    watch: {
        playIndex(newVal,oldVal){
            var audio = this.$refs.audio;
            audio.src = `https://music.163.com/song/media/outer/url?id=${this.playList[newVal].id}.mp3`;
            this.isPlay = true;
            this.$store.dispatch('player/getSongKeys',{ id: this.playList[newVal].id } );
        },
        isPlay(newVal){
            if(newVal){
                this.$refs.audio.play();
            }else{
                this.$refs.audio.pause();
            }
        }
    },
    methods: {
        controlAction(){
            this.isPlay = !this.isPlay;
        },
        showAction(){
            this.isShow = !this.isShow;
        },
        enterAction(el, done) {
            this.$refs.normalPlayer.enterAni(done);
        },
        afterEnterAction(el) {
            this.$refs.normalPlayer.afterEnter();
        },
        leaveAction(el, done) {
            this.$refs.normalPlayer.leaveAni(done);
        },
        dragAction(pro){
            this.$refs.audio.currentTime = this.duration*pro;
            this.$store.commit('player/setProgress', pro);
            this.$store.commit('player/setCurrentTime', this.$refs.audio.currentTime);
        },
        switchKeyAction(item){
            var time = item.time2;
            var pro = time/this.duration;

            this.$refs.audio.currentTime = time;
            this.$store.commit('player/setProgress', pro);
            this.$store.commit('player/setCurrentTime', time);
        }
    },
    mounted(){
        var audio = this.$refs.audio;
        audio.addEventListener('canplay', ()=>{
            this.$refs.audio.play();
            this.$store.commit('player/setDuration',audio.duration);
        } );

        audio.addEventListener('timeupdate', ()=>{
            var n = audio.currentTime / this.duration;
            this.$store.commit('player/setCurrentTime', audio.currentTime);
            this.$store.commit('player/setProgress', n);
        } );
        audio.addEventListener('ended', ()=>{
            if(this.chooseSort == 2){
                this.$refs.audio.currentTime = 0;
                this.$store.commit('player/setProgress', 0);
                this.$store.commit('player/setCurrentTime', 0);
            }else{
                this.$store.commit('player/changeIndex', 1);
            }
        });
        audio.addEventListener('play', ()=>{
            this.isPlay = true;
        });
        audio.addEventListener('pause', ()=>{
            this.isPlay = false;
        });

    }
}
</script>

<style scoped lang="scss">
#player{
    position: absolute;
    width: 100%;
    z-index: 998;
}
@keyframes mini-slide{
    0%{
        transform: translateY(100%);
    }
    100%{
        transform: translateY(0);
    }
}
.min-slide-in{
    animation: mini-slide 300ms ease-in;
}
.min-slide-out{
    animation: mini-slide 300ms ease-in reverse;
}

@keyframes nor-faded{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
.nor-faded-in{
    animation: nor-faded 300ms ease-in ;
}
.nor-faded-out{
    animation: nor-faded 300ms ease-in reverse;
}
</style>