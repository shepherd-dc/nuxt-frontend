import URL from '~/globalurl'

const userInfo = {
  state: {
    userInfo: {
      nickname: '',
      token: ''
    }
  },
  mutations: {
    TOKEN: (state, data) => {
      state.userInfo.token = data.token
    },
    ADD_USER_INFO: (state, data) => {
      // console.log(data.nickname)
      state.userInfo.nickname = data.nickname
    },
    LOGOUT: (state) => {
      localStorage.removeItem('token')
      state.userInfo = {}
    }
  },
  actions: {
    USER_INFO ({ commit }, { data }) {
      commit('TOKEN', data)
      this.$axios.post(`${URL}/token/secret`, {
        token: data.token
      }).then((res) => {
        // if (res) {
        //   console.log(res)
        // }
        commit('ADD_USER_INFO', res.data)
      })
    }
  }
}

export default userInfo
