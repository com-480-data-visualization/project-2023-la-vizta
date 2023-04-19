
import { useState, useEffect, useRef } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import L from 'leaflet'

import RegionPopup from './RegionPopup';

import { TracksPerRegion, TopGenresPerRegion } from '~/types'
import { MAP_BOUNDS } from './Map';

interface IRegion {
    name: string
    geom: string
    tracks: Track[]
    topGenres:  GenreName[]
}

const palette: {[genre: GenreName]: Color} = {
    'Alternative': '#f55dd4ff', // --purple-pizzazz: #f55dd4ff;
    'Arabic':      '#384dabff', // --violet-blue: #384dabff;
    'Bollywood':   '#3fd7dfff', // --robin-egg-blue: #3fd7dfff;
    'Hip-Hop/Rap': '#2fdf81ff', // --emerald: #2fdf81ff;
    'Latino':      '#0000ffff', //  blue =    --dark-pastel-green: #42b83eff;
    'Pop':         '#f3e32cff', // --aureolin: #f3e32cff;
    'Pop/Rock':    '#f78a40ff', // --orange-wheel: #f78a40ff;
    'K-Pop':       '#ff4e3eff', // --tomato: #ff4e3eff;
    'J-Pop':       '#7a3a0fff', // --russet: #7a3a0fff;
}

const fixLeft = (topLeftLng: number, popupLng: number) => {
    const minLng = MAP_BOUNDS.getWest()
    const lngInBounds = Math.max( minLng, topLeftLng )
    const deltaLng = lngInBounds - topLeftLng
    return popupLng + deltaLng
}

const fixRight = (topLeftLng: number, popupLng: number) => {
    const maxLng = MAP_BOUNDS.getEast()
    const lngInBounds = Math.min( maxLng, topLeftLng )
    const deltaLng = lngInBounds - topLeftLng
    return popupLng + deltaLng
}

export default function Country( {name, geom, tracks, topGenres}: IRegion ) 
{
    const topGenre = topGenres && topGenres[0]
    const color = palette[topGenre] || 'white'

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