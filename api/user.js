const API_VERSION = process.env.API_VERSION

export const REGISTER_URL = `/${API_VERSION}/client/register`
export const CHECK_NICKNAME = `/${API_VERSION}/user/nickname`
export const CHECK_EMAIL = `/${API_VERSION}/user/email`
export const LOGIN_URL = `/${API_VERSION}/token`
export const TOKEN_INFO = `/${API_VERSION}/token/secret`
