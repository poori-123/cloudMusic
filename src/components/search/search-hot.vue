<template>
  <div class="search-hot">
      <h1>热门搜索</h1>
      <ul>
          <li v-for="(item,index) in data" :key="index" @click="$emit('search',item.name)" >
              {{item.name}}
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    props: {
        data: Array
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/global-style.scss';
.search-hot{
    width: 100%;
    height: 2.4rem;
    padding:  0 0.2rem;
    h1{
        font-size: 0.14rem;
        padding: 0.35rem 0 0.2rem;
        color: $font-color-desc-v2;
        line-height: 0.14rem;
    }
    ul{
        display: flex;
        flex-wrap: wrap;
        li{
            padding: 0.05rem 0.1rem;
            margin:  0 0.2rem 0.1rem 0;
            background: #fff;
            font-size: 0.14rem;
            line-height: 0.14rem;
            border-radius: 0.04rem;
            color: #333;
        }
    }
}
</style>