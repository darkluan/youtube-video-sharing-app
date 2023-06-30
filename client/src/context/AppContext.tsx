import axios from 'axios'
import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import { api } from '~/configs'
import { getLocalStorage } from '~/utils/handleLocalStorage'
import IUser from '~/interfaces/IUser'
import Loading from '~/components/Loading'

export type UserData = {
  user: IUser
  setUser: (c: object) => void
  setIsLoading: (c: boolean) => void
}
const AppContext = createContext<UserData>({ user: {}, setUser: () => {}, setIsLoading: () => {} })

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({})
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)

  // Get token at the first time page loaded
  useEffect(() => {
    setToken(getLocalStorage('auth')?.access_token)
  }, [])

  useEffect(() => {
    handleFetchUserPayload()
  }, [token])

  const handleFetchUserPayload = async () => {
    try {
      if (!token) return
      const { data } = await axios.get(`${api.userInfo}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })
      setUser(data.data)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <AppContext.Provider value={{ user, setUser, setIsLoading }}>
      {isLoading && <Loading />}
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)
