import { useState } from "react";

import Country from '~/components/Country';
import RegionPopup from "./RegionPopup";
import Navbar from '../nav/';
import Map from '~/components/Map';

import useFetch from "~/hooks/useFetch";
import { GENRE_COLORS } from "~/constants";
import { Countries, Route } from "~/types";


function MapComponent( { loaded, regions, genres, setSelectedRegion }: any ) {

	const onClick = (i: number) => () => {
		const [name, _] = regions[i];
		setSelectedRegion( {
			region: name,
			topGenres: genres.topGenresPerRegion[name],
			tracks: genres.tracksPerRegion[name],
		} );
	};

	if ( !loaded ) return null

	return regions.map((region, i) => {
        const name = region[0];
        const geom = region[4];
        const tracks = genres.tracksPerRegion[name] || [];
        const topGenres = genres.topGenresPerRegion[name] || [];
        const topGenre = topGenres && topGenres[0];
        const color = GENRE_COLORS[topGenre] || "white";

        return (
			<Country
				key={`country-${i}`}
				color={color}
				geom={geom}
				onClick={onClick(i)}
			/>
        );
	} )
}

function OverlayComponent( { selectedRegion }: any ) {
	return selectedRegion && <RegionPopup {...selectedRegion} />
}

export default function Genres() {
	const { data: regions, isLoading: isRegionsLoading } = useFetch<Countries>("/countries/all");
	const { data: genres, isLoading: isGenresLoading } = useFetch("/genres");

	const [selectedRegion, setSelectedRegion] = useState(undefined);

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