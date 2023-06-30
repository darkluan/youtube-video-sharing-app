import VideoCard from '~/components/VideoCard'
import { IMovie } from '~/interfaces/IMovies'
import { useEffect, useState } from 'react'
import useYoutubeApi from '~/hooks/useYoutubeApi'
import { errorNotify } from '~/utils/helper'

function Index() {
  const { getVideoList } = useYoutubeApi()
  const [videos, setVideos] = useState<IMovie[] | undefined>([])
  const [offset, setOffset] = useState(1)
  const [isShowMore, setIsShowMore] = useState(true)
  const [total, setTotal] = useState(0)
  const limit = 1

  useEffect(() => {
    const fetchVideoList = async () => {
      try {
        const params = { limit, offset: 0 }
        const videosData = await getVideoList(params)
        setVideos(videosData)
        setTotal(videosData.total)
        if (videosData.total < limit + offset) setIsShowMore(false)
      } catch (error) {
        setIsShowMore(false)
        errorNotify({ message: 'Get list video Error' })
      }
    }

    fetchVideoList()
  }, [])

  const handleLoadmore = async () => {
    try {
      if (total <= limit + offset) setIsShowMore(false)
      setOffset(() => offset + 1)
      const params = { limit, offset: limit * offset }
      console.log(params)
      const videosData = await getVideoList(params)
      setVideos((pev) => [...pev, ...videosData])
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
        <button onClick={handleLoadmore} className={`btn ${isShowMore ? '' : 'hidden'}`}>
          Load more
        </button>
      </div>
    </>
  )
}

export default Index
