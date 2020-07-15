import { getToken, setToken, removeToken } from '~/utils/auth'

const user = {
  state: () => ({
    token: getToken(),
    nickname: '',
    avatar: ''
  }),

  mutations: {
    SET_TOKEN: (state, { token, nickname }) => {
      state.token = token
      state.nickname = nickname
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
    }
  }
}

export default user
