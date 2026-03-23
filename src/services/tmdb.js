async function searchMovies(query, page = 1, signal){
    const apiKey = import.meta.env.VITE_API_KEY
    const baseUrl = import.meta.env.VITE_BASE_URL
    const url = new URL(baseUrl)

    url.searchParams.append('api_key', apiKey)
    url.searchParams.append('query', query)
    url.searchParams.append('page', page)

    try{
        const response = await fetch(url.toString(), { signal })

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()

        return data
    } catch(error){
        console.error(`Error fetching movie data: ${error.message}`)
        throw error
    }
}

export { searchMovies }