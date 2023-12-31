import VideoCard from '~/components/VideoCard'
import { IMovie } from '~/interfaces/IMovies'
import { useEffect, useState } from 'react'
import useYoutubeApi from '~/hooks/useYoutubeApi'
import { errorNotify } from '~/utils/helper'

function Index() {
  const { getVideoList } = useYoutubeApi()
  const [videos, setVideos] = useState<IMovie[]>([])
  const [offset, setOffset] = useState(1)
  const [isShowMore, setIsShowMore] = useState(false)
  const [total, setTotal] = useState(0)
  const limit = 10

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const params = { limit, offset: 0 }
        const videosData = await getVideoList(params)
        setVideos(videosData)
        setTotal(videosData.total)
        if (videosData.total > limit + offset) setIsShowMore(true)
      } catch (error) {
        setIsShowMore(false)
        errorNotify({ message: 'Get list video Error' })
      }
    }

    fetchVideoList()
  }, [])

  const handleLoadmore = async () => {
    try {
      if (total >= limit + offset) setIsShowMore(true)
      setOffset(() => offset + 1)
      const params = { limit, offset: limit * offset }
      const videosData = await getVideoList(params)
      setVideos((prev) => [...prev, ...videosData])
    } catch (error) {
      errorNotify({ message: 'Get list video Error' })
    }
  }

  return (
    <>
      <div className='my-12'>
        {videos?.map((movie, index) => (
          <VideoCard key={index} movie={movie} />
        ))}
        <div className='w-full text-center mt-8'>
          <button onClick={handleLoadmore} className={`btn ${!isShowMore ? 'hidden' : ''}`}>
            Load more
          </button>
        </div>
      </div>
    </>
  )
}

export default Index
