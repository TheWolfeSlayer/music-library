import { useEffect, useState } from 'react'
import GalleryItem from './GalleryItem'

function Gallery({ data }) {
    const display = data.map((item, i) => {
        return <GalleryItem key={i} item={item} />
    })
    return(
        <div>
            {display}
        </div>
    )
}

export default Gallery