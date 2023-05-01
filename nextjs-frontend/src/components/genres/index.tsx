import { useState } from "react";
import { LeafletMouseEvent } from 'leaflet';
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
	genres: { [region: Region]: Genre };
	selectedRegion: Region | undefined;
	setSelectedRegion: (r: Region) => void
}


const latOffset = (z: number) => Math.pow(2, 5 - z) * 7.5


function MapComponent( { loaded, regions, genres, selectedRegion, setSelectedRegion }: IMapComponent ) {

	const onClick = (region: Region) => ({ latlng }: LeafletMouseEvent, map: any) => {
		setTimeout(() => {
			setSelectedRegion( region )
		}, 750);
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
	return (
		<>
		{ region ? <RegionPopup tracks={tracks[region]} genre={genres[region]} region={region} closePopup={closePopup} /> : null }
		<div className='absolute flex flex-col px-5 py-5 rounded backdrop-blur bg-[color:var(--white)] left-3 top-[40%] translate-y-[-50%]  z-[9000] hover:translate-x-[0%] transition-transform'>
			{ Object.entries(GENRE_COLORS).map( ([genre, color], i) => 
				<div key={`legend-${i}`} className='flex items-center gap-3 font-Quicksand'>
					<div className='w-4 h-4 rounded' style={{backgroundColor: color}}></div>{genre}
				</div>
			) }
        </div>
		</>
	)
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
