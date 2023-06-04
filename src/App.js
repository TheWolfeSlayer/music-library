import { useEffect, useState } from 'react'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'

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
            <SearchBar handleSearch={handleSearch}/>
            {message}
            <Gallery data={data}/>
        </div>
    )
}

export default App