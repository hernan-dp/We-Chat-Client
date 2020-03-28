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

export function setUsername (username) {
  window.localStorage.setItem('username', username)
}

export function getUsername () {
  return window.localStorage.getItem('username')
}

export function removeUsername () {
  return window.localStorage.removeItem('username')
}
