import { truncate } from '~/utils/helper'
import { IMovie } from '../../interfaces/IMovies'
import { useState } from 'react'

const VideoCard = ({ movie }: { movie: IMovie }) => {
  const { id, idVideo, title, description, sharedBy } = movie
  const [isReadMore, setIsReadMore] = useState(false)

  const handleClick = () => {
    setIsReadMore(!isReadMore)
  }

  return (
    <div id={id} className='card flex flex-col md:flex-row mb-4'>
      <iframe
        // className='w-full md:w-6/12'
        src={`https://www.youtube.com/embed/${idVideo}`}
        title={title}
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></iframe>
      <div className='text-center md:text-left pl-6'>
        <h4 className='text-red'>{title}</h4>
        <p>
          <b>Shared by:</b> {sharedBy}
        </p>
        <p>
          <b>Description: </b>
          {isReadMore ? description + ' ' : truncate(description)}
          {isReadMore ? (
            <b onClick={handleClick} className='cursor-pointer'>
              Hide
            </b>
          ) : (
            <b tabIndex={0} role='button' onClick={handleClick} className='cursor-pointer'>
              Read more
            </b>
          )}
        </p>
      </div>
    </div>
  )
}

export default VideoCard
