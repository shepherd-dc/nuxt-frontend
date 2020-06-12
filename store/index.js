import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters/getters'
import errorLog from './modules/errorLog'
import userInfo from './modules/userInfo'
import user from './modules/user'
import URL from '~/globalurl'

Vue.use(Vuex)

const store = () => new Vuex.Store({
  state: {
    width: 1080,
    menus: []
  },
  mutations: {
    ADD_MENUS: (state, data) => {
      state.menus = data
      // console.log(data)
    },
    SET_WIDTH: (state, width) => {
      state.width = width
    }
  },
  actions: {
    async nuxtServerInit ({ commit }, context) {
      const { data } = await context.$axios.get(`${URL}/menu`)
      commit('ADD_MENUS', data.data)
    },
    SetWidth ({ commit }, width) {
      commit('SET_WIDTH', width)
    }
  },
  getters,
  modules: {
    errorLog,
    userInfo,
    user
  }
})

export default store
