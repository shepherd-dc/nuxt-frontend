import { getToken, setToken, removeToken } from '~/utils/auth'

const user = {
  state: () => ({
    token: getToken(),
    nickname: '',
    avatar: '',
    roles: ''
  }),

  getters: {
    nickname: state => state.user.nickname,
    SNtoken: state => state.user.token
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      // eslint-disable-next-line
      console.log(name)
      state.nickname = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      // eslint-disable-next-line
      console.log(roles)
      state.roles = roles
    }
  },

  actions: {
    // 登录
    async Login ({ commit }, token) {
      setToken(token)
      // localStorage.setItem('token', token)
      commit('SET_TOKEN', token)

      const { data } = await this.$axios.post('/token/secret', {
        token
      })
      // eslint-disable-next-line
      console.log(data)
      commit('SET_ROLES', data.scope)
      commit('SET_NAME', data.nickname)
    },

    // 登出
    LogOut ({ commit }) {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', '')
      removeToken()
    }
  }
}

export default user
