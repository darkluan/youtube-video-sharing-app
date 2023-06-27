import axios from 'axios'
import { ReactNode, createContext, useEffect, useState } from 'react'
import config from '~/configs'
import { getLocalStorage } from '~/utils/handleLocalStorage'

interface CurrentUserContextType {
  user: object | null
}

interface UserData {
  email: string
}

const AppContext = createContext<CurrentUserContextType | null>(null)

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserData | null>(null)
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
      const apiUrl = config.apiUrl
      const { data } = await axios.get(`${apiUrl}/user`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      data.status === 200 && setUser(data.data)
    } catch (e) {
      console.error(e)
    }
  }

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>
}

export default AppContext
