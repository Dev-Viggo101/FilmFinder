import { Link } from 'react-router-dom'
import noPosterImage from '../assets/gallery.png'
import FavouriteButton from './FavouriteButton'

const TMDB_IMAGE_BAsE = 'https://image.tmdb.org/t/p/w500'

function MovieCard({movie, onClick}) {

  const { title, poster_path, release_date } = movie

  const imageURL = poster_path ? `${TMDB_IMAGE_BAsE}${poster_path}` : noPosterImage

  const releaseYear = release_date ? release_date.substring(0, 4) : 'N/A'

  return (
    // <Link to={`/movie/${movie.id}`} className="movie-card">

    //   <img src={imageURL} alt={`Poster for ${title}`} className="movie-poster" style={{ width: '15%', height: 'auto' }} />

    //   <div className="movie-details">

    //     <h3>{title}</h3>
    //     <p>{releaseYear}</p>

    //     <FavouriteButton movie={movie} />

    //   </div>

    // </Link>

    <div className='movie-card' onClick={() => onClick && onClick(movie)}>
      <img src={imageURL} alt={title} style={{ width: '15%', height: 'auto' }} />
      <h3>{title}</h3>
      <h4>{releaseYear}</h4>
      <FavouriteButton movie={movie} />
    </div>
  )
}

export default MovieCard