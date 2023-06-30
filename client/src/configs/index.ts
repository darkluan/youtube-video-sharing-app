const configs = {
  apiUrl: import.meta.env.VITE_APP_API_URL || 'https://shared-video-backend.onrender.com/api/v1',
  googleAPIKey: import.meta.env.VITE_APP_GOOGLE_API_KEY || 'AIzaSyC8HLe924zx0Z-SzI5HWbjQfqk7fmMs4Z8'
}
export const api = {
  token: '/authentication/token',
  register: '/users/register',
  shared: '/users/shared-video',
  userInfo: '/users/info',
  sharedVideos: '/shared/videos'
}

export default configs
