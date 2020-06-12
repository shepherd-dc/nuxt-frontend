import Vue from 'vue'
// 时间格式化
const formatDate = (date, fmt) => {
  const newDate = new Date(date)
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (newDate.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  const o = {
    'M+': newDate.getMonth() + 1,
    'd+': newDate.getDate(),
    'h+': newDate.getHours(),
    'm+': newDate.getMinutes(),
    's+': newDate.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, str)
    }
  }
  return fmt
}

const capitalize = (value) => {
  if (!value) { return '' }
  value = value.toString()
  return value === 'php' ? 'PHP' : value.charAt(0).toUpperCase() + value.slice(1)
}

const strSlice = (val, num) => {
  if (!val) { return '' }
  val = val.toString()
  let textLength = 0
  let newStr = ''
  for (let i = 0; i < val.length; i++) {
    if (val.charAt(i).match(/[\u0391-\uFFE5]/)) {
      textLength += 2
    } else {
      textLength++
    }
  }
  if (val.length < textLength) {
    newStr = val.slice(0, num)
  } else {
    newStr = val.slice(0, num * 2)
  }
  return val.length > num ? newStr + '...' : newStr
}

const filters = {
  formatDate,
  capitalize,
  strSlice
}

Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key])
})

export default filters
