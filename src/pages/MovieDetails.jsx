import { useState, useEffect } from "react"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"


function MovieDetails({ movieId }) {

  const apiKey = import.meta.env.VITE_API_KEY

  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true)
      try{
        const response = await fetch (`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
        const data = await response.json()
        setMovie(data)

        const video = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`)
        const vData = await video.json()
        const trailer = vData.results.find((vid) => vid.type === 'Trailer' && vid.site === 'YouTube')

        if(trailer){
          setTrailerKey(trailer.key)
        }

      }
      catch (e){
        setError(e.message)
      }
      finally{
        setLoading(false)
      }
    }
    fetchMovie()
  }, [movieId, apiKey])

  if(loading){
    return <Spinner />
  }
  if (error){
    return <ErrorMessage error={error} />
  }
  if(!movie){
    return null
  }

  return (
    <div className="movie-details-container">

      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />

      <div className="movie-info">

        <h1>{movie.title}</h1>
        {trailerKey ? (
          <iframe width="100%" height="250" src={`https://www.youtube.com/embed/${trailerKey}`} title="Movie Trailer" frameBorder="0" allowFullScreen></iframe>
        ) : (
          <p>No trailer available</p>
        )}
        <p>⭐ {movie.vote_average}</p>
        <p>{movie.release_date?.substring(0, 4)}</p>
        <p>{movie.overview}</p>

      </div>

    </div>
  )
}

export default MovieDetails