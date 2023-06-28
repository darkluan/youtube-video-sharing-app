/* eslint-disable prettier/prettier */
import { useAppContext } from '~/context/AppContext'
import { removeLocalStorage, setLocalStorage, getLocalStorage } from '~/utils/handleLocalStorage'
import axios from 'axios'
import IUser from '~/interfaces/IUser'
import { errorNotify } from '~/utils/helper'

const useAuth = () => {
  const { setUser } = useAppContext()

  const login = async ({ email, password }: IUser) => {
    try {
      setLocalStorage('auth', JSON.stringify({ email: email }))
      setUser({ email: email })
    } catch (error) {
      errorNotify({ message: 'Login error. Please check Email or Password' })
    }
  }
  const logout = () => {
    removeLocalStorage('auth')
    setUser({})
  }

  const register = async ({ email, password }: IUser) => {
    try {
      const { data } = await axios.post('/register', { email, password })
      setLocalStorage('auth', data)
      setUser(data)
    } catch (error) {
      errorNotify({ message: 'Register error.' })
    }
  }

  const getCurrentUser = () => {
    const userStr = getLocalStorage('auth')
    if (userStr) return userStr
    return null
  }

  return { logout, login, register, getCurrentUser }
}

export default useAuth
