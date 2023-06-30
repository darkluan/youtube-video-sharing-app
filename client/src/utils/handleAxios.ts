import axios from 'axios'
import configs, { api } from '~/configs'
import { getLocalStorage, removeLocalStorage } from '~/utils/handleLocalStorage'

axios.interceptors.request.use(
  (config) => {
    const auth = getLocalStorage('auth')
    config.baseURL = configs.apiUrl
    if (auth.access_token) config.headers.Authorization = `Bearer ${auth.access_token}`
    if (config.url?.includes('googleapis.com')) config.headers.Authorization = null
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (err) => {
    if (err.response && err.response.data) {
      const {
        response: { status }
      } = err
      if (err.response.request.responseURL === `${configs.apiUrl}${api.token}` && status === 403) {
        removeLocalStorage('auth')
        window.location.reload()
      }

      if (status === 403) {
        return axios({
          url: `${configs.apiUrl}${api.token}`,
          method: 'post',
          data: {
            grant_type: 'refresh_token',
            refresh_token: getLocalStorage('auth')?.refresh_token
          }
        }).then((response) => {
          localStorage.setItem('auth', response && response.data)
          err.response.config.headers['Authorization'] = response && response.data.access_token
          return axios(err.response.config)
        })
      }
    }
    return Promise.reject(err)
  }
)
