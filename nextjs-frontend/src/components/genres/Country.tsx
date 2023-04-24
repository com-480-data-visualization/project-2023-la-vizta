
import { GeoJSON, useMap } from 'react-leaflet';

import { GenreName, Track } from '~/types';
import { paletteGenre } from '~/constants';

interface IRegion {
    color: string;
    geom: string;
    onClick: () => void;
}

export default function Country( {color, geom, onClick}: IRegion ) 
{
    const map = useMap()

    const _onClick = ( { latlng }: any ) => {
        onClick()
        map.flyTo(latlng, map._zoom, {duration: 0.5, noMoveStart: false})
    }

    return (
        <GeoJSON 
            style={{fillColor: color, color, weight: 1}} 
            data={JSON.parse(geom)} 
            eventHandlers={{click: _onClick}} />
    )
}