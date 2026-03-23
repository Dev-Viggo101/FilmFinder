import MovieCard from "./MovieCard"

function MovieGrid({movies, onMovieClick}) {
  return (
    <div className="movie-grid">

      {movies.map((movie) => (
        <div key={movie.id}>
            <MovieCard movie={movie} onClick={onMovieClick}/>
        </div>
      ))}

    </div>
  )
}

export default MovieGrid