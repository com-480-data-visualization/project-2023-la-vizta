import { useState, useEffect } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import L from "leaflet";

import RegionPopup from "./RegionPopup";
import Navbar from "./Navbar";
import useFetch from "~/hooks/useFetch";

import { Track, GenreName, Color, RegionGeometry, Region } from "~/types";

import "leaflet/dist/leaflet.css";

export const MAP_BOUNDS = L.latLngBounds(
    L.latLng(-220, -300), 
    L.latLng(220, 300)
)

const mapOptions = {
    center: {lat: 46.801111, lng: 8.226667},
    zoom: 3,
    minZoom: 2,
    maxZoom: 5,
    maxBoundsViscosity: 1,
    maxBounds: MAP_BOUNDS,
}



const MapWrapper = () => {
	const { data: regions, isLoading: isRegionsLoading } = useFetch("/country/all");
	const { data: genres, isLoading: isGenresLoading } = useFetch("/genres");

    return (
        <MapContainer 
            {...mapOptions}
            style={{height: '100vh', border: undefined}}
            // TODO: fractional zooming without weird separation between tiles
            // zoomSnap={0.5}
            // zoomDelta={0.25}
            preferCanvas={true} 
        >
            <TileLayer
                className="grayscale-tilelayer"
                minZoom={1}
                maxZoom={5}
                zoomSnap={0.1}
                // TODO: thunderforest tilelayer
                // subdomains='abcd'
                url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png'
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Navbar />
            { !isRegionsLoading && !isGenresLoading && regions.map( ([name, geom], i) =>
                <Country
                    key={`country-${i}`}
                    name={name} 
                    geom={geom} 
                    tracks={genres.tracksPerRegion[name] || []} 
                    topGenres={genres.topGenresPerRegion[name] || []} />
            ) }
        </MapContainer>
    )
}

export default MapWrapper;
