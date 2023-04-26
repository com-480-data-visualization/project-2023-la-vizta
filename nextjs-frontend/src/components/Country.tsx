
import { GeoJSON, useMap } from 'react-leaflet';
import Color from 'color'

import { GenreName, Track } from '~/types';
import { paletteGenre } from '~/constants';
import { log } from 'console';

interface IRegion {
    color: string;
    geom: string;
    onClick: () => void;
}

const highlight = (color: string) => Color(color).saturate(0.5).lighten(0.2)
const darken = (color: string) => Color(color).saturate(0.5).darken(0.2)

export default function Country( {color, geom, onClick}: IRegion ) 
{
    const map = useMap()

    const _onClick = ( { latlng }: any ) => {
        onClick()
        map.flyTo(latlng, map._zoom, {animate: true, duration: 0.75})
    }

    const onEachFeature = (feature, layer) => {
        layer.on('mouseover', function(e){
            layer.setStyle( { ...layer.options.style, fillColor: highlight(color), color: darken(color) } )
        });
        layer.on('mouseout', function(e){
            layer.setStyle( { ...layer.options.style, fillColor: color, color } )
        });
    }

    return (
        <GeoJSON 
            style={{fillColor: color, color, weight: 1}} 
            onEachFeature={onEachFeature}
            data={JSON.parse(geom)} 
            eventHandlers={{click: _onClick}} />
    )
}