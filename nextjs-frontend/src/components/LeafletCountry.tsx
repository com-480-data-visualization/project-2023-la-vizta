
import { GeoJSON, useMap } from 'react-leaflet';
import Color from 'color'
import { LeafletEventHandlerFnMap, LeafletMouseEvent } from 'leaflet';

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

    const eventHandlers: LeafletEventHandlerFnMap = {
        click: ( { latlng }: LeafletMouseEvent ) => {
            onClick()
            map.flyTo(latlng, map.getZoom(), {animate: true, duration: 0.75})
        },
        mouseover: ( { target }: LeafletMouseEvent) => {
            target.setStyle( { ...target.options.style, fillColor: highlight(color), color: darken(color) } )
        },
        mouseout: ( { target }: LeafletMouseEvent) => {
            target.setStyle( { ...target.options.style, fillColor: color, color } )
        }
    }

    return (
        <GeoJSON 
            style={{fillColor: color, color, weight: 1} as any} 
	        data={JSON.parse(geom)} 
            eventHandlers={eventHandlers} />
    )
}
