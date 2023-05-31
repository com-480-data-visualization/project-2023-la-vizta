import { useState, useEffect } from 'react';
import { LeafletMouseEvent } from 'leaflet';
import Color from 'color'
import Fade from '@mui/material/Fade';

import LeafletCountry from '~/components/LeafletCountry';
import RegionPopup from "./RegionPopup";
import Navbar from '../nav/';
import Map from '~/components/Map';

import useFetch from "~/hooks/useFetch";
import { GENRE_COLORS } from "~/constants";
import { Track, Genre, Region, Country, GenrePerRegion } from "~/types";


interface IMapComponent {
	loaded: boolean;
	showPopup: boolean;
	regions: Country[] | undefined;
	genres: { [region: Region]: Genre };
	selectedRegion: Region | undefined;
	setSelectedRegion: (r: Region) => void
	setShowPopup: (s: boolean) => void
}


const LAT_OFFSET = 15
const FLYTO_ZOOM = 4
const FLYTO_DURATION = 0.75

function MapComponent( { loaded, showPopup, regions, genres, selectedRegion, setSelectedRegion, setShowPopup }: IMapComponent ) {

	const onClick = (region: Region) => ({ latlng }: LeafletMouseEvent, map: any) => {
		setTimeout(() => {
			setSelectedRegion(region)
			setShowPopup(true)
		}, FLYTO_DURATION * 1000);
		const { lat, lng } = latlng
		const zoom = map.getZoom()
		map.flyTo( {lat: lat - LAT_OFFSET, lng}, FLYTO_ZOOM, {animate: true, duration: FLYTO_DURATION})
	}

	if ( !loaded ) return null

	return (
		<>
		{ regions !== undefined && genres !== undefined &&
			regions.map( ({name, geom}, i) => {

				const genre = genres[name];
				let color = Color(GENRE_COLORS[genre] || "#fff");
				if ( selectedRegion !== undefined && showPopup )
				{
					if (selectedRegion !== name)
						color = color.saturate(0).darken(0.7)
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
	loaded: boolean;
	showPopup: boolean;
	region: Region | undefined
	tracks: { [region: Region]: Track[] }
	genres: { [region: Region]: Genre }
	closePopup: () => void
}

function OverlayLegend( { open }: { open: boolean } ) {
	return (
		<div className='absolute left-3 top-[40%] translate-y-[-50%] z-[9000]'>
			<Fade in={open}>
				<div className='flex flex-col px-5 py-5 rounded backdrop-blur bg-[color:var(--white)]'>
					{ Object.entries(GENRE_COLORS).map( ([genre, color], i) => 
						<div key={`legend-${i}`} className='flex items-center gap-3 font-Quicksand'>
							<div className='w-4 h-4 rounded' style={{backgroundColor: color}}></div>{genre}
						</div>
					) }
				</div>
			</Fade>
		</div>
	)
}

function OverlayComponent( { loaded, showPopup, region, tracks, genres, closePopup }: IOverlayComponent ) {
	if ( !loaded || region === undefined )
		return null
	

	console.log('here', showPopup);
	
	
	return (
		<>
		<Fade in={showPopup}>
			<div className="absolute bottom-0 left-0 p-3 z-[9000] w-full">
				<RegionPopup tracks={tracks[region]} genre={genres[region]} region={region} closePopup={closePopup} />
			</div>
		</Fade>
		<OverlayLegend open={!showPopup} />
		</>
	)
} 

export default function Genres() {
	const { data: regions, isLoading: isRegionsLoading } = useFetch<Country[]>("/countries/all");
	const { data, isLoading: isGenresLoading } = useFetch<GenrePerRegion>("/genres");
	
	const { tracks, genres } = data || { tracks: {}, genres: {} }

	const [selectedRegion, setSelectedRegion] = useState<Region | undefined>(undefined);
	const [showPopup, setShowPopup] = useState<boolean>(false);

	const closePopup = () => {
		setShowPopup(false)
	}

	const loaded = !isRegionsLoading && !isGenresLoading

	useEffect( () => {
		if (loaded)
			setSelectedRegion('France')
	}, [loaded] )

	return (
		<>
		<Map>
			<MapComponent 
				regions={regions} 
				genres={genres} 
				loaded={loaded} 
				showPopup={showPopup}
				selectedRegion={selectedRegion}
				setSelectedRegion={setSelectedRegion} 
				setShowPopup={setShowPopup} />
		</Map>
		<Navbar />
		<OverlayComponent 
			loaded={loaded} 
			showPopup={showPopup}
			region={selectedRegion} 
			tracks={tracks} 
			genres={genres} 
			closePopup={closePopup} />
		</>
	)
}
