import { useState } from "react";
import Color from 'color'

import LeafletCountry from '~/components/LeafletCountry';
import RegionPopup from "./RegionPopup";
import Navbar from '../nav/';
import Map from '~/components/Map';

import useFetch from "~/hooks/useFetch";
import { GENRE_COLORS } from "~/constants";
import { Track, Genre, Region, Country, GenrePerRegion } from "~/types";


interface IMapComponent {
	loaded: boolean;
	regions: Country[] | undefined;
	genres: GenresPerRegion | undefined;
	selectedRegion: Region | undefined;
	setSelectedRegion: (r: Region) => void
}

// 2: 60
// 3: 30
// 4: 15
// 5: 7.5

const latOffset = (z: number) => Math.pow(2, 5 - z) * 7.5


function MapComponent( { loaded, regions, genres, selectedRegion, setSelectedRegion }: IMapComponent ) {

	const onClick = (region: Region) => ({ latlng }: LeafletMouseEvent, map: any) => {
		setSelectedRegion( region )
		const { lat, lng } = latlng
		const zoom = map.getZoom()
		map.flyTo( {lat: lat - latOffset(zoom), lng}, map.getZoom(), {animate: true, duration: 0.75})
	}

	if ( !loaded ) return null

	return (
		<>
		{ regions !== undefined && genres !== undefined &&
			regions.map( ({name, geom}, i) => {

				const genre = genres[name];
				let color = Color(GENRE_COLORS[genre] || "#fff");
				if ( selectedRegion !== undefined )
				{
					if (selectedRegion == name)
						color = color.saturate(1).lighten(0.3)
					else
						color = color.saturate(0).darken(0.4)
				}

				return (
					<LeafletCountry
						key={`country-${i}`}
						color={color.string()}
						geom={geom}
						onClick={onClick(name)}
					/>
				);
			} )
		}
		</>
	)
}

interface IOverlayComponent {
	region: Region | undefined
	tracks: { [region: Region]: Track[] }
	genres: { [region: Region]: Genre }
	closePopup: () => void
}

function OverlayComponent( { region, tracks, genres, closePopup }: IOverlayComponent ) {
	return region ? <RegionPopup tracks={tracks[region]} genre={genres[region]} region={region} closePopup={closePopup} /> : null
} 

export default function Genres() {
	const { data: regions, isLoading: isRegionsLoading } = useFetch<Country[]>("/countries/all");
	const { data, isLoading: isGenresLoading } = useFetch<GenrePerRegion>("/genres");
	
	const { tracks, genres } = data || { tracks: {}, genres: {} }

	const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined);

	const closePopup = () => setSelectedRegion(undefined)

	const loaded = !isRegionsLoading && !isGenresLoading

	return (
		<>
		<Map>
			<MapComponent 
				regions={regions} 
				genres={genres} 
				loaded={loaded} 
				selectedRegion={selectedRegion}
				setSelectedRegion={setSelectedRegion} />
		</Map>
		<Navbar />
		<OverlayComponent region={selectedRegion} tracks={tracks} genres={genres} closePopup={closePopup} />
		</>
	)
}