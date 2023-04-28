
import { GeoJSON, useMap } from 'react-leaflet';
import Color from 'color'

import { Genre, Track } from '~/types';

interface IRegion {
    color: string;
    geom: string;
    onClick: () => void;
}

const highlight = (color: string) => Color(color).saturate(0.5).lighten(0.2)
const darken = (color: string) => Color(color).saturate(0.5).darken(0.2)

export default function LeafletCountry( {color, geom, onClick}: IRegion ) 
{
    const map = useMap()

    const _onClick = ( { latlng }: any ) => {
        onClick()
        map.flyTo(latlng, (map as any)._zoom, {animate: true, duration: 0.75})
    }

    const onEachFeature = (feature: any, layer: any) => {
        layer.on('mouseover', () =>
            layer.setStyle( { ...layer.options.style, fillColor: highlight(color), color: darken(color) } )
        );
        layer.on('mouseout', () => 
            layer.setStyle( { ...layer.options.style, fillColor: color, color } )
        );
    }

    const AnyGeoJSON: any = GeoJSON as any;

    return (
        <AnyGeoJSON 
            style={{fillColor: color, color, weight: 1} as any} 
            onEachFeature={onEachFeature}
	        data={JSON.parse(geom)} 
            eventHandlers={{click: _onClick}} />
    )
}
