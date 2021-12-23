// import store from '~/store'
import { getStorage } from '~/utils/auth'

export default function ({ $axios, redirect }) {
  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.LOCAL_URL : process.env.SERVER_URL
  $axios.setBaseURL(baseUrl)

  $axios.onRequest((config) => {
    // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    const token = getStorage('SN-Token')
    if (token) {
      // config.headers['SN-Token'] = token
      config.auth = {}
      config.auth.username = token
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
    // console.error('Server error:', error)
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/400')
    }
    if (code === 401) {
      // redirect('/login')
    }
  })
}
