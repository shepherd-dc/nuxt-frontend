// import store from '~/store'
import { getToken } from '~/utils/auth'

export default function ({ $axios, redirect }) {
  $axios.onRequest((config) => {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    config.auth = {}
    config.auth.username = getToken()
    // console.log('Making request to ' + config.url)
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
