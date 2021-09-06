import Cookies from 'js-cookie'
import { MessageBox } from 'element-ui'
import { TOKEN_INFO } from '@/api'

export function getToken (TokenKey = 'SN-Token') {
  return Cookies.get(TokenKey)
}

export function setToken (token, TokenKey = 'SN-Token') {
  return Cookies.set(TokenKey, token)
}

export function removeToken (TokenKey = 'SN-Token') {
  return Cookies.remove(TokenKey)
}

export async function checkToken (ctx) {
  const token = ctx.$store.getters.SNtoken
  let valid = false

  if (token) {
    const res = await ctx.$axios.post(TOKEN_INFO, { token })
    if (res.error_code === 0) {
      valid = true
      ctx.$store.dispatch('user/checkToken', valid)
    }

    if (res.error_code === 1002 || res.error_code === 1003) {
      MessageBox.confirm('登录凭证已失效，请重新登录', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ctx.$router.push('/login')
      }).catch(() => {
      })
    }
  }

  return { valid }
}

export function loginRequired (ctx) {
  if (!ctx.valid) {
    MessageBox.confirm('请登录后操作', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      ctx.$router.push('/login')
    }).catch(() => {
    })
    return false
  }
  return true
}
