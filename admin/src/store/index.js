import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    system_config: [],
    admin: {},
    loading: false,
    is_loading: true,
    user: {},
    onLogin: false,
    getConfig: getConfig,
    isCollapse: false,
    is_change_password: false,
    merchant: { username: '' },

  },
  mutations: {

  },
  actions: {

  },
  modules: {
  }
})

function getConfig(index) {
  for (let { key, value } of this.system_config) {
    if (index == key) return value
  }
}