
import { Popup, useMapEvent } from 'react-leaflet';
import { Region, Track, GenreName } from '~/types';
import { useEffect, useRef } from 'react';
import { MAP_BOUNDS } from './Map';

// <img width={200} height={200} src='https://media-cdn.tripadvisor.com/media/photo-l/1a/f6/f1/b8/default-avatar-2020-22.jpg'></img> 

// const rankColors = [
//     '#CBAA18',
//     '#A2A19D',
//     '#CC7E18',
//     '#3E9A9D',
//     '#3E9A9D'
// ]

const rankColors = [
    '#FF9D00',
    '#FF5400',
    '#B01A2E',
    '#9A9A9A',
    '#9A9A9A'
]

interface IRegionPopup {
    region: Region,
    topGenres: GenreName[]
    tracks: Track[]
}

const CTrack = ( { i, track }: { i: number, track: Track } ) => {
    return (
        <div className=''>
            <h4 className='text-lg font-semibold whitespace-nowrap text-ellipsis font-Azeret mb-[-5px] mt-1'><span>{i}.</span> {track.title}</h4>
            <p className='font-Quicksand whitespace-nowrap text-ellipsis'>{track.artist}</p>
        </div>
    )
}

const CGenre = ( { i, genre }: { i: number, genre: string } ) => {
    return (
        <p className='whitespace-nowrap text-ellipsis font-Quicksand'>
            <span style={{color: rankColors[i - 1], textShadow: '0 0 2px #000'}} className='text-2xl font-bold mr-2 font-Azeret'>{i}</span>
            {genre}
        </p>
    )
}

const RegionPopup = ( { region, topGenres, tracks }: IRegionPopup ) => {

    return (
        <Popup>
            <div>
                <div className='m-auto max-w-min whitespace-nowrap font-Playfair text-2xl'>{region}</div>
                <div className='m-auto w-14 border-t-2 border-black mt-1 mb-3'></div>
                <div className='flex gap-10 text-base font-Jetbrains'>
                    <div className=''>
                        {topGenres.map( (genre, j) => <CGenre key={`genre-${j}`} i={j + 1} genre={genre} /> )}
                    </div>
                    <div className=''>
                        {tracks.map( (track, j) => <CTrack key={`track-${j}`} i={j + 1} track={track} /> )}
                    </div>
                </div>
                {/* <Chart {...props} /> */}
            </div>
        </Popup>
    )
}

export default RegionPopup