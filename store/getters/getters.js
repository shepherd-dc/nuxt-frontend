const getters = {
  width: state => state.width,
  menus: state => state.menus,
  nickname: state => state.user.nickname,
  SNtoken: state => state.user.token
}
export default getters
