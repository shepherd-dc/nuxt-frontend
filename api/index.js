export function parseUrl (url) {
  const API_VERSION = process.env.API_VERSION
  url = url.replace(/^\//, '')
  return `/${API_VERSION}/${url}`
}

export * from './user'
export * from './menu'
export * from './article'
