import axios from 'axios'
import { ReactNode, createContext, useEffect, useState, useContext } from 'react'
import configs, { api } from '~/configs'
import { getLocalStorage } from '~/utils/handleLocalStorage'
import IUser from '~/interfaces/IUser'
import Loading from '~/components/Loading'
import socketIOClient from 'socket.io-client'
const socket = socketIOClient(configs.socketUrl)
import { toast } from 'react-toastify'
import useYoutubeApi from '~/hooks/useYoutubeApi'

export type UserData = {
  user: IUser
  setUser: (c: object) => void
  setIsLoading: (c: boolean) => void
}
const AppContext = createContext<UserData>({ user: {}, setUser: () => {}, setIsLoading: () => {} })

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser>({})
  const [token, setToken] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const { getGoogleApiVideos } = useYoutubeApi()

  useEffect(() => {
    // Listen for incoming messages from the server
    if (!user?.email) return
    socket.on('message', async (data) => {
      try {
        data = JSON.parse(data)
        if (user?.email === data?.sharedBy) return
        const rs = await getGoogleApiVideos(data.youtube_id)
        toast.info(
          <>
            <div className=''>
              <b>{rs?.data?.items[0]?.snippet?.title}</b>
              <br></br> video has been shared by {data?.sharedBy}
            </div>
          </>,
          { autoClose: false, position: toast.POSITION.TOP_CENTER }
        )
      } catch (error) {
        console.log(error)
      }
    })
  }, [user])

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
      if (data) setUser(data.data)
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
