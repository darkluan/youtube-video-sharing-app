const configs = {
  apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/api/v1',
  googleAPIKey: import.meta.env.VITE_APP_GOOGLE_API_KEY
}
export const api = {
  login: '/login',
  register: '/register',
  shared: '/shared',
  userInfo: '/userInfo',
  lis: '/userInfo'
}

export default configs
