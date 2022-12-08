import Vue from 'vue'
import Vuex from 'vuex'
import system from './module/system'
import user from './module/user'
import globalGetters from './globalGetters'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // 严格模式
  modules: {
    system,
    user
  },
  state: {},
  mutations: {},
  actions: {},
  getters: globalGetters
})
