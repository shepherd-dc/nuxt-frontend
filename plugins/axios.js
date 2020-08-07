import sha256 from 'crypto-js/sha256'
import Base64 from 'crypto-js/enc-base64'

function crypto (str) {
  const _sign = sha256(str)
  return encodeURIComponent(Base64.stringify(_sign))
}

export default function ({ $axios, redirect }) {
  // BASE_URL
  const baseUrl = process.env.NODE_ENV === 'development' ? process.env.BASE_URL : '/'
  $axios.setBaseURL(baseUrl)

  // request interceptor
  $axios.onRequest((config) => {
    // do something before request is sent
    const timestamp = Date.now()
    const secret = process.env.SECRET
    const param = `timestamp=${timestamp}&secret=${secret}`
    const sign = crypto(param)
    config.params = Object.assign({}, config.params, { timestamp, sign })

    console.log(`Making request to ${baseUrl}${config.url}`)

    return config
  })

  // request error interceptor
  $axios.onRequestError((error) => {
    // do something with request error
    console.error('request error:', error) // for debug
    return Promise.reject(error)
  })

  // response interceptor
  $axios.onResponse((response) => {
    const res = response.data
    if (res.error_code === 0) {
      return res
    } else {
      // redirect('/404')
      // if the custom code is not 0, it is judged as an error.
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  })

  // response error interceptor
  $axios.onResponseError((error) => {
    // do something with response error
    console.error('response error:', error) // for debug
    return Promise.reject(error)
  })

  // error interceptor
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      // redirect('/404')
      console.error('参数错误:', error)
    } else if (code === 500) {
      // redirect('/500')
      console.error('服务器内部错误:', error)
    }
  })
}
