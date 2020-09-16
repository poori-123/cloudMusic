<template>
<transition enter-active-class="slide-in" leave-active-class="slide-out">
  <div id="search">
    <header>
        <span class="iconfont icon-fanhui" @click="backAction"></span>
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="value" >
        <span class="iconfont icon-message-close" v-show="isSearch" @click="disAction"></span>
    </header>
    <div class="wrap" v-if="!loading">   
    <keep-alive>
        <searchHot v-if="!isSearch" :data="topList" @search="searchAction"  />
        <searchList 
            v-if="isSearch"
            :suggestList="suggestList"
            :searchList="searchList"
            :loading="inSearch"
        />
    </keep-alive>
    </div>

    <transition enter-active-class="fly-in" leave-active-class="fly-out">
        <router-view/>
    </transition>

  </div>
</transition>
</template>

<script>
import searchHot from '../components/search/search-hot';
import searchList from '../components/search/search-list';

import {mapState} from 'vuex';
export default {
    components: {
        searchHot,
        searchList
    },
    data(){
        return {
            isSearch: false,
            handleLoading: true,
            value: ''
        }
    },
    computed: {
        ...mapState({
            topList: state => state.search.hotList,
            loading: state => state.search.firstLoad,
            suggestList: state => state.search.suggestList,
            searchList: state => state.search.searchList,
            inSearch: state => state.search.inSearch
        })
    },
    methods: {
        searchAction(msg){
            this.value = msg;
        },
        getData(val){
            this.lastTime = Date.now();
            this.timer = setTimeout(() => {
                this.$store.dispatch( 'search/getSearchReult', val );
                this.isSearch = true;
            }, 300);
        },
        disAction(){
            this.value = '';
        },
        backAction(){
            this.value = '';
            this.$router.back()
        }
    },
    watch: {
        value(newVal){
            if(newVal !== ''){
                if(!this.lastTime){
                    this.getData(newVal);
                }else{
                    var nowTime = Date.now();
                    if( (nowTime - this.lastTime) > 300 ){
                        this.getData(newVal);   
                    }else{
                        clearTimeout(this.timer);
                        this.getData(newVal);
                    }
                }
            }else{
                clearTimeout(this.timer);
                this.isSearch = false;
            }
        }
    },
    created(){
        this.$store.dispatch('search/getHotList')
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
        position: relative;
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
            width: 1.57rem;
            height: 0.11rem;
            line-height: 0.11rem;
            border: 0;
            border-bottom: 1px solid #fff;
            color: $font-color-light;
            font-size: 0.07rem;
            margin: 0 0.05rem;
            padding: 0;
            padding-left: 0.01rem;
            background: $theme-color;
            caret-color: $font-color-light;
            transform: scale(2);
            transform-origin: left center;
            &::placeholder{
                font-size: 0.07rem;
                line-height: 0.1rem;
                color: $font-color-light;
            }
        }
        .icon-message-close{
            position: absolute;
            width: 0.3rem;
            text-align: center;
            height: 100%;
            line-height: 0.4rem;
            top: 0;
            right: 0.11rem;
            font-size: 0.16rem;
            color: $font-color-light;
            background: $theme-color;
        }
    }
    .wrap{
        width: 100%;
        position: absolute;
        top: 0.4rem;
        bottom: 0;
        width: 100%;
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