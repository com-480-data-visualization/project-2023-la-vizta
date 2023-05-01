import { FiX } from 'react-icons/fi'

import StreamChart from "./NewStreamChart";

import { GENRE_COLORS, CHART_COLORS } from '~/constants';
import { Region, Track, Genre } from "~/types";

interface IRegionPopup {
  	region: Region
	genre: Genre
	tracks: Track[]
	closePopup: () => void
}

interface IGenre {
  i: number;
  genre: Genre;
  color: string;
}

const CGenre = ({ i, genre, color }: IGenre) => {
	const fontGenres = ["xx-large", "x-large", "large", "small", "small"];
	return (
		<p
			className="font-Quicksand pb-2 leading-none"
			style={{ color: color, fontSize: fontGenres[i - 1] }}
		>
			{genre}
		</p>
	);
};

interface ITrack {
	i: number; 
	track: Track
}

const CTrack = ({ i, track }: ITrack) => {
	return (
		<div className='flex mb-2 overflow-hidden'>
			<p className="max-w-md text-xl font-semibold font-Azeret whitespace-nowrap text-ellipsis overflow-hidden mt-1 mr-3 rounded p-1 bg-[#fff5] h-min w-8 min-w-[2rem] text-center" 
				style={{ color: CHART_COLORS[i - 1] }}>
				{i}
			</p>
			<div className='max-w-[80%]'>
				<p className='font-Jetbrains text-lg font-semibold overflow-hidden text-ellipsis whitespace-nowrap'>{track.title}</p>
				<p className="font-Quicksand text-md overflow-hidden text-ellipsis whitespace-nowrap">
					{track.artist}
				</p>
				<p className="flex font-Quicksand text-sm max-w-[100%] overflow-hidden text-ellipsis whitespace-nowrap italic">
					{track.genre.replaceAll(',', ' • ')}
				</p>
			</div>
		</div>
	);
};

const RegionPopup = ( { region, genre, tracks, closePopup }: IRegionPopup ) => {
	return (
		<div className="absolute bottom-0 left-0 p-3 z-[9000] w-full">
			<div className='relative px-6 py-4 rounded backdrop-blur bg-[color:var(--white)]'>
				<div className="absolute right-6 rounded p-3 cursor-pointer hover:bg-[color:var(--white)] transition-colors" onClick={closePopup}><FiX className='text-xl' /></div>
				<div className="flex items-center font-Playfair text-5xl mb-7">
					{region} <span className='font-Quicksand text-2xl mt-3 ml-2'>• {genre}</span>
				</div>
				<div className='grid' style={{ gridTemplateColumns: '25% 75%' }}>
					<div className="flex flex-col text-base font-Jetbrains">
						{tracks.map((track, j) => (
							<CTrack key={`track-${j}`} i={j + 1} track={track} />
						))}
					</div>
					<StreamChart region={region} tracks={tracks} />
				</div>
			</div>
		</div>
	);
};

export default RegionPopup;
