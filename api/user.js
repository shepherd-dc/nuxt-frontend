import { parseUrl } from './index'

export const REGISTER_URL = parseUrl('/client/register')
export const CHECK_NICKNAME = parseUrl('/user/nickname')
export const CHECK_EMAIL = parseUrl('/user/email')
export const GET_USER_INFO = parseUrl('/user/info')
export const EDIT_USER_INFO = parseUrl('/user/info/edit')
export const UPLOAD_IMAGE = parseUrl('/upload/image')
export const USER_STATISTICS = parseUrl('/user/statistics')
export const LOGIN_URL = parseUrl('/token')
export const TOKEN_INFO = parseUrl('/token/secret')
export const TOKEN_KEY = parseUrl('/token/code/key')
