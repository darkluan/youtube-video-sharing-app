const configs = {
  apiUrl: import.meta.env.VITE_APP_API_URL || 'http://localhost:3001/api/v1',
  googleAPIKey: import.meta.env.VITE_APP_GOOGLE_API_KEY
}
export const api = {
  token: '/authentication/token',
  register: '/users/register',
  shared: '/users/shared-video',
  userInfo: '/users/info',
  sharedVideos: '/shared/videos'
}

export default configs
