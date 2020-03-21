/* Global localStorage */
export function setToken (token) {
  window.localStorage.setItem('token', token)
}

export function getToken () {
  return window.localStorage.getItem('token')
}

export function removeToken () {
  return window.localStorage.removeItem('token')
}
