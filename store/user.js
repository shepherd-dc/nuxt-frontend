import { getToken, setToken, removeToken } from '~/utils/auth'

const user = {
  state: () => ({
    token: getToken(),
    hasLogin: false,
    nickname: '',
    avatar: ''
  }),

  mutations: {
    SET_TOKEN: (state, { token, nickname }) => {
      state.token = token
      state.nickname = nickname
    },
    CHECK_TOKEN: (state, bool) => {
      state.hasLogin = bool
    }
  },

  actions: {
    // 登录
    Login ({ commit }, data) {
      setToken(data)
      commit('SET_TOKEN', data)
    },
    // 登出
    LogOut ({ commit }) {
      commit('SET_TOKEN', {
        token: '',
        nickname: ''
      })
      removeToken()
    },
    checkToken ({ commit }, bool) {
      commit('CHECK_TOKEN', bool)
    }
  }
}

export default user
