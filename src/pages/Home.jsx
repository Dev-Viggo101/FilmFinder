import { useState, useEffect } from "react"
import SearchBar from "../components/SearchBar"
import MovieGrid from "../components/MovieGrid"
import Spinner from "../components/Spinner"
import ErrorMessage from "../components/ErrorMessage"
import { searchMovies } from "../services/tmdb"
import Modal from "../components/Modal"
import MovieDetails from "./MovieDetails"
import SkeletonGrid from "../components/SkeletonGrid"

function Home() {

  const apiKey = import.meta.env.VITE_API_KEY

  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [trendingMovies, setTrendingMovies] = useState([])
  const [popularMovies, setPopularMovies] = useState([])
  const [topRatedMovies, setTopRatedMovies] = useState([])
  const [continueWatching, setContinueWatching] = useState([])
  const [debounceQuery, setDebounceQuery] = useState('')

  const handleSearch = (searchBarValue) => {
    const trimmedValue = searchBarValue.trim()

    setPage(1)
    setQuery(trimmedValue)
  }

  useEffect(() => {
    if(!debounceQuery) return

    const controller = new AbortController()

    const fetchMovies = async () => {
      setLoading(true)
      setError(null)

      try{
        const data = await searchMovies(debounceQuery, page, controller.signal)
        setMovies(data.results)
        setTotalPages(data.total_pages)
      } 
      catch(err){ 
        if(err.name !== 'AbortError'){
          setError(err.message || 'An error occurred')
        }
      } 
      finally{
        setLoading(false)
      }
    }

    fetchMovies()
    return () => controller.abort()
  }, [debounceQuery, page])

  useEffect(() => {
    const fetchCategories = async () => {
      try{

        const [trendingRes, popularRes, topRatedRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`),
          fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`)          
        ])

        const trendingData = await trendingRes.json()
        const popularData = await popularRes.json()
        const topRatedData = await topRatedRes.json()

        setTrendingMovies(trendingData.results)
        setPopularMovies(popularData.results)
        setTopRatedMovies(topRatedData.results)
      }
      catch(e){
        setError(e.message)
      }
    }
    fetchCategories()
  }, [apiKey])

   const handleMovieClick = (movie) => {
    setSelectedMovie(movie)
    setIsModalOpen(true)

    let stored = JSON.parse(localStorage.getItem('continueWatching') || '[]')

    stored = stored.filter(item => item.id !== movie.id)

    stored.unshift(movie)

    stored = stored.slice(0, 5)

    localStorage.setItem('continueWatching', JSON.stringify(stored))

    setContinueWatching(stored)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTimeout(() => setSelectedMovie(null), 300)
  }

  let content

  if(loading){
    content = <SkeletonGrid />
  } else if(query && !debounceQuery){
    content = <p className="searching">Searching...</p>
  } else if (error){
    content = <ErrorMessage error={error} />
  } else if (query){
    content = movies.length > 0 ? (<MovieGrid movies={movies} onMovieClick={handleMovieClick} />) : (<p>No movies found for {query}</p>)
  } else {
    content = (
      <>
        {continueWatching.length > 0 && (
          <div className="category-section">
            <h2>Continue Browsing</h2>
            <MovieGrid movies={continueWatching} onMovieClick={handleMovieClick} />
          </div>
        )}

        <div className="category-section">
          <h2>Trending</h2>
          <MovieGrid movies={trendingMovies} onMovieClick={handleMovieClick} />
        </div>

        <div className="category-section">
          <h2>Popular</h2>
          <MovieGrid movies={popularMovies} onMovieClick={handleMovieClick} />
        </div>

        <div className="category-section">
          <h2>Top Rated</h2>
          <MovieGrid movies={topRatedMovies} onMovieClick={handleMovieClick} />
        </div>
      </>
    )
  }

  const handleNextPage = () => {
    if(page < totalPages){
      setPage(prev => prev + 1)
    }
  }

  const handlePrevPage = () => {
    if(page > 1){
      setPage(prev => prev - 1)
    }
  }

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('continueWatching') || '[]')
    setContinueWatching(stored)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceQuery(query)
    }, 500)

    return () => clearTimeout(timer)
  }, [query])

  return (
    <div>
      
      <SearchBar onSearch={handleSearch} />

      <div className="main-content">
        {content}
      </div>

      {query && movies.length > 0 && (
        <div className="pagination">

          <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>

          <span>Page {page} of {totalPages}</span>

          <button onClick={handleNextPage} disabled={page === totalPages}>Next</button>

        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedMovie && (
          <MovieDetails movieId={selectedMovie.id} />
        )}
      </Modal>

    </div>
  )
}

export default Home