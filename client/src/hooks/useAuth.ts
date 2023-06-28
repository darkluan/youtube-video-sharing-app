/* eslint-disable prettier/prettier */
import { useAppContext } from '~/context/AppContext'
import { removeLocalStorage, setLocalStorage } from '~/utils/handleLocalStorage'
import axios from 'axios'
import { errorNotify } from '~/utils/helper'

const useAuth = () => {
  const { setUser, user } = useAppContext()

  const login = async ({ params }: { params: any }) => {
    const { email, password } = params
    // call api
    try {
      const { data } = await axios.post('/login', { email, password })
      setLocalStorage('auth', data)
      setUser(data)
    } catch (error) {
      errorNotify({ message: 'Login error' })
    }
  }
  const logout = () => {
    removeLocalStorage('auth')
    setUser({})
  }
  return { logout, login }
}

export default useAuth
