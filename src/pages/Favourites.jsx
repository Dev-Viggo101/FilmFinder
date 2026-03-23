import { useState, useEffect } from "react"
import MovieGrid from '../components/MovieGrid'
import Modal from '../components/Modal'
import MovieDetails from './MovieDetails'

function Favourites() {

  const [favourites, setFavourites] = useState([])
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMovie(null), 300)
  }

  const loadFavourites = () => {
    const storedFavourites = JSON.parse(localStorage.getItem('favourites') || '[]')
    setFavourites(storedFavourites)
  }

  useEffect(() => {
    loadFavourites()

    const handleStorageChange = () => {
      loadFavourites()
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <div className="favourites-page">

      <h1>Your Favourites</h1>
      {favourites.length > 0 ? (
        <MovieGrid movies={favourites} onMovieClick={handleMovieClick} />
      ) : (
        <p>No favourite movies yet</p>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMovie && (
          <MovieDetails movieId={selectedMovie.id} />
        )}
      </Modal>

    </div>
  )
}

export default Favourites