import { useState, useEffect } from "react"

function FavouriteButton({movie}) {

    const [isFavourite, setIsFavourite] = useState(false)

    useEffect(() => {
        const favourites = JSON.parse(localStorage.getItem('favourites') || '[]')
        setIsFavourite(favourites.some(fav => fav.id === movie.id))
    }, [movie.id])

    const toggleFavourite = (e) => {
        e.stopPropagation()
        let favourites = JSON.parse(localStorage.getItem('favourites') || '[]')

        if(isFavourite){
            favourites = favourites.filter(fav => fav.id !== movie.id)
        }
        else{
            const movieData = {
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date
            }

            if(!favourites.some(fav => fav.id === movie.id)){
                favourites.push(movieData)
            }
        }

        localStorage.setItem('favourites', JSON.stringify(favourites))
        setIsFavourite(!isFavourite)

        window.dispatchEvent(new Event('storage'))
    }

  return (
   <button onClick={(e) => {toggleFavourite}>{isFavourite ? '❤️' : '🤍'}</button>
  )
}

export default FavouriteButton
