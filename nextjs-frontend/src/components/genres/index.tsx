import { useState } from "react";

import LeafletCountry from '~/components/LeafletCountry';
import RegionPopup from "./RegionPopup";
import Navbar from '../nav/';
import Map from '~/components/Map';

import useFetch from "~/hooks/useFetch";
import { GENRE_COLORS } from "~/constants";
import { Genre, Region, Country, GenresPerRegion, Route } from "~/types";

interface SelectedRegion {
	region: Region;
	topGenres: Genre[]
	tracks: Track[]
}

interface IMapComponent {
	loaded: boolean;
	regions: Country[];
	genres: GenresPerRegion;
	setSelectedRegion: (r: SelectedRegion) => void
}

function MapComponent( { loaded, regions, genres, setSelectedRegion }: IMapComponent ) {

	const onClick = (i: number) => () => {
		const { name } = regions[i];
		setSelectedRegion( {
			region: name,
			topGenres: genres.topGenresPerRegion[name],
			tracks: genres.tracksPerRegion[name],
		} );
	};

	if ( !loaded ) return null

	return regions.map( ({name, geom}, i) => {
        const tracks = genres.tracksPerRegion[name] || [];
        const topGenres = genres.topGenresPerRegion[name] || [];
        const topGenre = topGenres && topGenres[0];
        const color = GENRE_COLORS[topGenre] || "white";

        return (
			<LeafletCountry
				key={`country-${i}`}
				color={color}
				geom={geom}
				onClick={onClick(i)}
			/>
        );
	} )
}

interface IOverlayComponent {
	selectedRegion: SelectedRegion
}

function OverlayComponent( { selectedRegion }: IOverlayComponent ) {
	return selectedRegion && <RegionPopup {...selectedRegion} />
}

export default function Genres() {
	const { data: regions, isLoading: isRegionsLoading } = useFetch<Country[]>("/countries/all");
	const { data: genres, isLoading: isGenresLoading } = useFetch<GenresPerRegion>("/genres");

	const [selectedRegion, setSelectedRegion] = useState<SelectedRegion>(undefined);

	const loaded = !isRegionsLoading && !isGenresLoading

	return (
		<>
		<Map>
			<MapComponent regions={regions} genres={genres} loaded={loaded} setSelectedRegion={setSelectedRegion} />
		</Map>
		<Navbar />
		<OverlayComponent selectedRegion={selectedRegion} />
		</>
	)
}