import Cookies from 'js-cookie'

export function getToken (TokenKey = 'SN-Token') {
  return Cookies.get(TokenKey)
}

export function setToken (token, TokenKey = 'SN-Token') {
  return Cookies.set(TokenKey, token)
}

export function removeToken (TokenKey = 'SN-Token') {
  return Cookies.remove(TokenKey)
}
