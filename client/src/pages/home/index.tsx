import VideoCard from '~/components/VideoCard'
import { moviesData } from '~/interfaces/IMovies'

function index() {
  return (
    <>
      <div className='my-12'>
        {moviesData.map((movie, index) => (
          <VideoCard key={index} movie={movie} />
        ))}
      </div>
    </>
  )
}

export default index
