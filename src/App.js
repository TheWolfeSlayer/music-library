import { useEffect, useState, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import { createResource as fetchData } from './helper'


function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState(null)

    useEffect(() => {
      const fetchData = async () => {
        const API_URI = `https://itunes.apple.com/search?term=${encodeURI(search)}`
        const response = await fetch(API_URI)
        const data = await response.json()
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Not Found')
        }
      }

      if (searchTerm) {
        setData(fetchData(searchTerm))
    }
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    const renderGallery = () => {
      if(data){
          return (
              <Suspense fallback={<h1>Loading...</h1>} >
                  <Gallery data={data} />
              </Suspense>
          )
      }
  }
  

  return (
    <div className="App">
        <SearchBar handleSearch={handleSearch} />
        {message}
        {renderGallery()}
    </div>
)

}  
export default App