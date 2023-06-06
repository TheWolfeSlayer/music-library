import { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './Contexts/DataContext'
import AlbumView from './components/ArtistView'
import ArtistView from './components/ArtistView'

function App(){
    let [search, setSearch] = useState('')
    let [message, setMessage] = useState('Search for Music!')
    let [data, setData] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const API_URI = `https://itunes.apple.com/search?term=${encodeURI(search)}`
        const response = await fetch(API_URI)
        const data = await response.json()
        console.log(data)
        if (data.results.length > 0) {
          setData(data.results)
        } else {
          setMessage('Not Found')
        }
      }

      if (search) fetchData()
    }, [search])

    const handleSearch = (e, term) => {
      e.preventDefault()
      setSearch(term)
    }

    return (
        <div>
            {message}
            <Router>
              <Routes>
                <Route path='/' element={
                  <Fragment>
                    <SearchBar handleSearch={handleSearch} />
                    <Gallery data={data} />
                  </Fragment>
                } />
                <Route path='album/:id' element={<AlbumView />}/>
                <Route path='artist/:id' element={<ArtistView />}/>
              </Routes>
            </Router>
        </div>
    )
}

export default App