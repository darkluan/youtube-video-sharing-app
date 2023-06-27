import VideoCard from '~/components/VideoCard'
import { videosData } from '~/components/VideoCard/videosData'

function index() {
  return (
    <>
      <div className='my-12'>
        {videosData.map((video, index) => (
          <VideoCard key={index} video={video} />
        ))}
      </div>
    </>
  )
}

export default index
