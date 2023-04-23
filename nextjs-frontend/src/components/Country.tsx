
import { GeoJSON, useMap } from 'react-leaflet';

import RegionPopup from './RegionPopup';
import { GenreName, Track } from '~/types';
import { paletteGenre } from '~/constants';


interface IRegion {
    name: string
    geom: string
    tracks: Track[]
    topGenres:  GenreName[]
}


// const fixLeft = (topLeftLng: number, popupLng: number) => {
//     const minLng = MAP_BOUNDS.getWest()
//     const lngInBounds = Math.max( minLng, topLeftLng )
//     const deltaLng = lngInBounds - topLeftLng
//     return popupLng + deltaLng
// }

// const fixRight = (topLeftLng: number, popupLng: number) => {
//     const maxLng = MAP_BOUNDS.getEast()
//     const lngInBounds = Math.min( maxLng, topLeftLng )
//     const deltaLng = lngInBounds - topLeftLng
//     return popupLng + deltaLng
// }

export default function Country( {name, geom, tracks, topGenres}: IRegion ) 
{
    const topGenre = topGenres && topGenres[0]
    const color = paletteGenre[topGenre] || 'white'

    const map = useMap()

    const onClick = ({target}: any) => {
        const { lat, lng } = target._popup._latlng
        const center = { lat: lat + 10, lng }
        map.flyTo(center, target._map._zoom, {duration: 0.5, noMoveStart: false})
    }

    return (
        <GeoJSON style={{fillColor: color, color, weight: 1}} data={JSON.parse(geom)} eventHandlers={{click: onClick}}>
            <RegionPopup region={name} topGenres={topGenres} tracks={tracks} />
        </GeoJSON>
    )
}