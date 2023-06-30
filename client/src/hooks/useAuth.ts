/* eslint-disable prettier/prettier */
import { useAppContext } from '~/context/AppContext'
import { removeLocalStorage, setLocalStorage } from '~/utils/handleLocalStorage'
import axios from 'axios'
import IUser from '~/interfaces/IUser'
import { errorNotify, successNotify } from '~/utils/helper'
import { api } from '~/configs'

const useAuth = () => {
  const { setUser, setIsLoading } = useAppContext()

  const login = async ({ email, password }: IUser) => {
    try {
      setIsLoading(true)
      const { data } = await axios.post(api.token, { email, password, grant_type: 'password' })
      setLocalStorage('auth', data.data)
      setUser(data.data.user)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      errorNotify({ message: 'Login error. Please check Email or Password' })
    }
  }
  const logout = () => {
    removeLocalStorage('auth')
    setUser({})
  }

  const register = async ({ email, password }: IUser) => {
    try {
      setIsLoading(true)
      await axios.post(api.register, { email, password })
      successNotify({ message: 'Register success.' })
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
      errorNotify({ message: 'Register error.' })
    }
  }

  // const getCurrentUser = () => {
  //   const userStr = getLocalStorage('auth')
  //   if (userStr) return userStr
  //   return null
  // }

  return { logout, login, register }
}

export default useAuth
