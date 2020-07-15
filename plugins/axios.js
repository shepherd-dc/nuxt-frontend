// import store from '~/store'
import { getToken } from '~/utils/auth'

export default function ({ $axios, redirect }) {
  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.SERVER_URL
  $axios.setBaseURL(baseUrl)

  $axios.onRequest((config) => {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    let cookie = getToken()
    if (cookie) {
      cookie = JSON.parse(cookie)
      config.auth = {}
      config.auth.username = cookie.token
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('Making request to ' + config.url)
    }
    return config
  })

  $axios.onResponse((response) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Server response: ', response.data)
    }
    return response.data
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
