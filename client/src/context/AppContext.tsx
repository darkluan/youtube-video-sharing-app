import axios from 'axios'
import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import config from '~/configs'
import { getLocalStorage } from '~/utils/handleLocalStorage'

export type UserData = {
  user: {
    email?: string
  }
  setUser: (c: object) => void
}
const AppContext = createContext<UserData>({ user: {}, setUser: () => {} })

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState()

  // Get token at the first time page loaded
  useEffect(() => {
    setToken(getLocalStorage('auth'))
  }, [])

  useEffect(() => {
    handleFetchUserPayload()
  }, [token])

  const handleFetchUserPayload = async () => {
    try {
      if (!token) return
      const { data } = await axios.get(`${config.apiUrl}/userInfo`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      data.status === 200 && setUser(data.data)
    } catch (e) {
      console.error(e)
    }
  }

  return <AppContext.Provider value={{ user, setUser }}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
