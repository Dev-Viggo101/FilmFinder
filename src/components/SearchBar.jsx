import { useState } from "react"

function SearchBar({onSearch}) {

  const [searchValue, setSearchValue] = useState('')

  const handleChange = (e) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    onSearch(newValue)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(!searchValue.trim()) return
    onSearch(searchValue)
  }

  return (
    <form onSubmit={handleSubmit}>

      <input type="text" value={searchValue} onChange={handleChange} placeholder="Enter movie name..."/>
      {/* <button type="submit">Search</button> */}

    </form>
  )
}

export default SearchBar