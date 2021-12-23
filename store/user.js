import { getStorage, setStorage, removeStorage } from '~/utils/auth'
import { GET_USER_INFO } from '~/api'

const user = {
  state: () => ({
    token: getStorage('SN-Token'),
    hasLogin: false,
    nickname: getStorage('SN-Nickname'),
    avatar: getStorage('SN-Avatar')
  }),

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      state.hasLogin = true
      setStorage('SN-Token', token)
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
      setStorage('SN-Nickname', nickname)
    },
    CHECK_TOKEN: (state, bool) => {
      state.hasLogin = bool
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
      setStorage('SN-Avatar', avatar)
    }
  },

  actions: {
    // 登录
    Login ({ commit }, { token, nickname }) {
      commit('SET_TOKEN', token)
      commit('SET_NICKNAME', nickname)
      this.$axios.get(GET_USER_INFO).then((res) => {
        if (res.error_code === 0) {
          const { data } = res
          commit('SET_AVATAR', data.avatar)
        }
      })
    },
    // 登出
    LogOut ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_NICKNAME', '')
      commit('SET_AVATAR', '')
      removeStorage('SN-Token')
      removeStorage('SN-Nickname')
      removeStorage('SN-Avatar')
    },
    checkToken ({ commit }, bool) {
      commit('CHECK_TOKEN', bool)
    }
  }
}

export default user
