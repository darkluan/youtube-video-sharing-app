/* eslint-disable prettier/prettier */
import axios from 'axios'
import configs from '~/configs'
import { IMovie } from '~/interfaces/IMovies'
const googleApiUrl = 'https://www.googleapis.com/youtube/v3/videos'

const useYoutubeApi = () => {
  const getVideoList = async (videoIds: string) => {
    try {
      const response = await axios.get(googleApiUrl, {
        params: {
          part: 'snippet',
          id: videoIds,
          fields: 'items',
          key: configs.googleAPIKey
        }
      })

      const videos = response.data.items
      const fmVideos = formatVideos(videos)
      return fmVideos
    } catch (error) {
      console.error('Error fetching video list:', error)
      throw error
    }
  }

  function formatVideos(videos: IMovie[]) {
    return videos.map((item: any) => ({
      id: item.id,
      src: `https://www.youtube.com/embed/${item.id}`,
      title: item?.snippet.title,
      description: item?.snippet.description,
      shareBy: 'string'
    }))
  }

  return { getVideoList }
}

export default useYoutubeApi
