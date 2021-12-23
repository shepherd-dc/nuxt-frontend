import { MENU_LIST, TOKEN_KEY } from '../api'

const preRequest = async (axios, url, commit, action) => {
  const res = await axios.get(url)
  if (res.error_code === 0) {
    const { data } = res
    commit(action, data)
    return data
  }
}

export const state = () => ({
  menus: [],
  isPC: true,
  key: ''
})

export const mutations = {
  ADD_MENUS: (state, data) => {
    state.menus = data
  },
  SET_DEVICE: (state, device) => {
    state.isPC = device
  },
  SAVE_KEY: (state, key) => {
    state.key = key
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { $axios }) {
    preRequest($axios, MENU_LIST, commit, 'ADD_MENUS')
    preRequest($axios, TOKEN_KEY, commit, 'SAVE_KEY')
  }
}

export const getters = {
  menus: state => state.menus,
  isPC: state => state.isPC,
  key: state => state.key,
  nickname: state => state.user.nickname,
  avatar: state => state.user.avatar,
  SNToken: state => state.user.token,
  hasLogin: state => state.user.hasLogin
}
