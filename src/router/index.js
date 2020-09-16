import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/recommend',
    children: [
      {
        path: 'recommend',
        name: 'Recommend',
        component: () => import(/* webpackChunkName : "recommend" */'../views/Recommend.vue'),
        children: [
          {
            path: ':id',
            name: 'songList',
            component: () => import(/* webpackChunkName : "songList" */'../views/songList.vue')
          }
        ]
      },
      {
        path: 'singers',
        name: 'Singers',
        component: () => import(/* webpackChunkName : "singers" */'../views/Singers.vue'),
        children: [
          {
            path: ':id',
            name: 'singerSongs',
            component: () => import(/* webpackChunkName : "singerSongs" */'../views/singerSongs.vue')
          }
        ]
      },
      {
        path: 'rank',
        name: 'Rank',
        component: () => import(/* webpackChunkName : "rank" */'../views/Rank.vue'),
        children: [
          {
            path: ':id',
            name: 'rankSongList',
            component: () => import(/* webpackChunkName : "songList" */'../views/songList.vue')
          }
        ]
      },
      {
        path: 'search',
        name: 'Search',
        component: () => import(/* webpackChunkName : "search" */'../views/Search.vue'),
        children: [
          {
            path: ':id',
            name: 'searchSongs',
            component: () => import(/* webpackChunkName : "songList" */'../views/songList.vue')
          },
          {
            path: ':id',
            name: 'searchSingers',
            component: () => import(/* webpackChunkName : "singerSongs" */'../views/singerSongs.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
