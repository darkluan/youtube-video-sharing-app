import VideoCard from '~/components/VideoCard'
import { IMovie } from '~/interfaces/IMovies'
import { useEffect, useState } from 'react'
import useYoutubeApi from '~/hooks/useYoutubeApi'
import { errorNotify } from '~/utils/helper'

function Index() {
  const { getVideoList } = useYoutubeApi()
  const [videos, setVideos] = useState<IMovie[]>([])

  const videoIds = 'Ks-_Mh1QhMc,c0KYU2j0TM4,eIho2S0ZahI,52Zs3Jo7cy0'

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        // const videoIds = await api.get('/list-shared')
        const videosData = await getVideoList(videoIds)
        setVideos(videosData)
      } catch (error) {
        errorNotify({ message: 'Get list video Error' })
      }
    }

    fetchVideoList()
  }, [videoIds])

  return (
    <>
      <div className='my-12'>
        {videos.map((movie, index) => (
          <VideoCard key={index} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default Index
