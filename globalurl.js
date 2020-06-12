// 服务器地址
const SERVER_URL = 'https://shepherdnet.top/v1'

const LOCAL_URL = 'http://127.0.0.1:5051/v1'

const isDev = process.env.NODE_ENV === 'development'

const URL = isDev ? LOCAL_URL : SERVER_URL

// const URL = 'https://shepherdnet.top/v1'

export default URL
