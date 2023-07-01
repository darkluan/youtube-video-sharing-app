/* eslint-disable prettier/prettier */
import axios from 'axios'
import configs, { api } from '~/configs'
import { useAppContext } from '~/context/AppContext'
import { IMovie } from '~/interfaces/IMovies'
import { errorNotify, successNotify, youtubeParserId } from '~/utils/helper'
const googleApiUrl = 'https://www.googleapis.com/youtube/v3/videos'
const youtubeUrl = 'https://www.youtube.com/embed'

const useYoutubeApi = () => {
  const { setIsLoading } = useAppContext()
  const getVideoList = async ({ limit, offset }: { limit: number; offset: number }) => {
    try {
      setIsLoading(true)
      const {
        data: {
          data: { items, total }
        }
      } = await axios.get(api.sharedVideos, {
        params: {
          limit,
          offset
        }
      })
      const videoIds = items.map((item: any) => item.youtube_id)
      const sharedByKeys = {} as any
      items.map((item: any) => {
        sharedByKeys[item.youtube_id] = { sharedBy: item.user.email, sharedId: item.id }
      })
      const response = await getGoogleApiVideos(videoIds)

      const videos = response?.data.items
      const fmVideos = formatVideos(videos, sharedByKeys)
      fmVideos.total = total
      setIsLoading(false)
      return fmVideos
    } catch (error) {
      setIsLoading(false)
      errorNotify({ message: 'Error fetching video list' })
    }
  }

  function formatVideos(videos: [] | any, sharedByKeys: any) {
    return videos.map((item: IMovie) => ({
      id: sharedByKeys[item?.id]?.sharedId,
      idVideo: item.id,
      src: `${youtubeUrl}/${item.id}`,
      title: item?.snippet.title,
      description: item?.snippet.description,
      sharedBy: sharedByKeys[item?.id]?.sharedBy
    }))
  }

  async function getGoogleApiVideos(videoIds: [] | string) {
    try {
      return await axios.get(googleApiUrl, {
        params: {
          part: 'snippet',
          id: videoIds.toString(),
          fields: 'items',
          key: configs.googleAPIKey
        },
        headers: { Authorization: null }
      })
    } catch (error) {
      errorNotify({ message: 'Error fetching video' })
    }
  }

  const submitShared = async (url: string) => {
    try {
      setIsLoading(true)
      if (url === '' || !url.includes('youtube.com')) return
      const youtubeId = youtubeParserId(url)
      const checkVideo = await getGoogleApiVideos(youtubeId)
      if (checkVideo?.data.items.length === 0) {
        errorNotify({ message: 'Video not found' })
        setIsLoading(false)
        return
      }
      await axios.post(api.shared, {
        youtube_id: youtubeId
      })
      successNotify({ message: 'Shared video success' })
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      if (error?.response) {
        errorNotify({ message: error?.response.data.message })
      } else {
        errorNotify({ message: 'API Shared video Error' })
      }
    }
  }

  return { getVideoList, submitShared, getGoogleApiVideos }
}

export default useYoutubeApi
