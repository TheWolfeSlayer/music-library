import { useParams,useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'

function AlbumView() {
    const { id } = useParams()
    const [ albumData, setAlbumData ] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const API_URI = `http://localhost:4000/song/${id}`
            const response = await fetch(API_URI)
            const data = await response.json()
            
            const songs = data.results.filter(item => item.kind === 'song')
            setAlbumData(songs)
        }

        fetchData()
    }, [id])

    const navigate = useNavigate()

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    const display = albumData && albumData.map(song => {
        return(
            <div key={song.trackId}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {navButtons()}
            {display}
        </div>
    )
}

export default AlbumView