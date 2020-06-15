export const state = () => ({
  menus: [],
  isPC: true
})

export const mutations = {
  ADD_MENUS: (state, data) => {
    state.menus = data
    // console.log(data)
  },
  SET_DEVICE: (state, device) => {
    state.isPC = device
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, { $axios }) {
    const res = await $axios.get('/menu')
    if (res.error_code === 0) {
      const { data } = res
      commit('ADD_MENUS', data)
    }
  }
}

export const getters = {
  menus: state => state.menus,
  isPC: state => state.isPC,
  nickname: state => state.user.nickname,
  SNtoken: state => state.user.token
}
