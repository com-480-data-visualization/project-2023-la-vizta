import { useState } from 'react'

import Country from './DynamicCountry';
import RegionPopup from './RegionPopup';

import useFetch from '~/hooks/useFetch';
import { paletteGenre } from '~/constants';


export default function Genres()
{
    const { data: regions, isLoading: isRegionsLoading } = useFetch("/country/all");
	const { data: genres, isLoading: isGenresLoading } = useFetch("/genres");

    const [selectedRegion, setSelectedRegion] = useState(undefined)

    if (isRegionsLoading || isGenresLoading) return null

    const onClick = (i: number) => () => {
        const [name, _] = regions[i]
        setSelectedRegion({
            region: name,
            topGenres: genres.topGenresPerRegion[name],
            tracks: genres.tracksPerRegion[name]
        })
    }

    return (
        <>
        { regions.map( ([name, geom], i) => {
            const tracks = genres.tracksPerRegion[name] || []
            const topGenres = genres.topGenresPerRegion[name] || []
            const topGenre = topGenres && topGenres[0]
            const color = paletteGenre[topGenre] || 'white'

            return <Country
                key={`country-${i}`}
                color={color} 
                geom={geom}
                onClick={onClick(i)} />
        } ) }
        { selectedRegion && <RegionPopup {...selectedRegion} /> }
        </>
    )
}