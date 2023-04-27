import { MapContainer, TileLayer } from "react-leaflet"
import L from "leaflet"

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
    style: { height: '100vh', border: undefined },
    preferCanvas: true 
}

// TODO: fractional zooming without weird separation between tiles
// zoomSnap={0.5}
// zoomDelta={0.25}


const MapWrapper = ( { children }: any ) => {
    return (
        <MapContainer {...mapOptions}>
            <TileLayer
                className="grayscale-tilelayer"
                minZoom={1}
                maxZoom={5}
                // zoomSnap={0.1}
                // TODO: thunderforest tilelayer
                // subdomains='abcd'
                url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-background/{z}/{x}/{y}{r}.png'
                // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            { children }
        </MapContainer>
    )
}

export default MapWrapper;
