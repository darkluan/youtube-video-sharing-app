import axios from 'axios'

import configs from '~/configs'
import { getLocalStorage, removeLocalStorage } from '~/utils/handleLocalStorage'

axios.interceptors.request.use(
  async (config: any) => {
    const auth = await getLocalStorage('auth')
    config.headers = {
      Authorization: `Bearer ${auth?.access_token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => Promise.resolve(response),
  (err) => {
    const {
      response: { status, data }
    } = err
    const getTokenUrl = '/authentication/token'
    if (err.response.request.responseURL === `${configs.apiUrl}${getTokenUrl}` && status === 403) {
      removeLocalStorage('auth')
      window.location.reload()
    }

    if (status === 403) {
      return axios({
        url: `${configs.apiUrl}${getTokenUrl}`,
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

    return Promise.reject(err)
  }
)