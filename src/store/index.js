import Vue from 'vue';
import Vuex from 'vuex';

import recommend from './modules/recommend';
import singers from './modules/singers';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    recommend,
    singers
  }
})
