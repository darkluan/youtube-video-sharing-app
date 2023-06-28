import { IMovie } from '../../interfaces/IMovies'

const VideoCard = ({ movie }: { movie: IMovie }) => {
  const { id, title, description, shareBy } = movie
  return (
    <div className='card flex flex-col md:flex-row mb-4'>
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
      <div className='text-center md:text-left pl-6'>
        <h4 className='text-red'>{title}</h4>
        <p>
          <b>Shared by:</b> {shareBy}
        </p>
        <p>
          <b>Description</b> <br></br>
          {description}
        </p>
      </div>
    </div>
  )
}

export default VideoCard
