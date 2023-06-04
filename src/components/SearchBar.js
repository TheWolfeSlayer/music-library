import { useEffect, useState } from 'react'

function SearchBar({ handleSearch }) {
    const [searchTerm, setSearchTerm] = useState('')

    return (
        <form onSubmit={(e) => handleSearch(e, searchTerm)}>
            <input onChange={(e) => setSearchTerm(e.target.value)} placeholder='Enter a search term' />
            <input type='submit' />
        </form>
    )
}

export default SearchBar