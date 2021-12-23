import Cookies from 'js-cookie' // 服务端渲染没有 localStorage
import { MessageBox } from 'element-ui'
import { TOKEN_INFO } from '@/api'

export function getStorage (key) {
  return Cookies.get(key)
}

export function setStorage (key, val) {
  if (typeof val === 'object') { val = JSON.stringify(val) }
  return Cookies.set(key, val)
}

export function removeStorage (key) {
  return Cookies.remove(key)
}

export async function checkToken (ctx) {
  const token = ctx.$store.getters.SNToken
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
