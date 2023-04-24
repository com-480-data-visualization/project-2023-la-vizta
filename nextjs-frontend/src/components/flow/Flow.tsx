import { useMap } from 'react-leaflet';

import Country from './Country';

import CanvasFlowmapLayer from '~/lib/CFLCopy'
import useFetch from '~/hooks/useFetch';
import { Countries } from '~/types';
import { useEffect } from 'react';

const toGeoJson = (regionA, regionB) => {
    return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [regionA[1], regionA[2]]
        },
        "properties": {
          "origin_id": regionA[0],
          "origin_lon": regionA[2],
          "origin_lat": regionA[1],
          "destination_id": regionB[0],
          "destination_lon": regionB[2],
          "destination_lat": regionB[1]
        }
    }
}

const buildFeatures = (data: Countries[], regions: object) => {
    const explored = new Set()
    const features = []
    let start = undefined // type: region
    for ( const [name, ..._] of data )
    {
        if ( explored.has(name) ) 
            continue
        if ( start !== undefined )
        {
            const region = regions[name]
            const feature = toGeoJson(start, region)
            features.push(feature)
        }
        explored.add(name)
        start = regions[name]
    }
    return features
}

const toRegionMap = (regions: any[]) => {
    const res = {}
    for ( const [name, ...rest] of regions )
        res[name] = rest
    return res
}



export default function Flow()
{
    const { data: history, isLoading: isHistoryLoading } = useFetch("/clean/history?id=3lCbsHaN1wCxyDzcNN2x4N");
    const { data: regions, isLoading: isRegionsLoading } = useFetch<Countries>("/countries/all");

    const map = useMap()

    useEffect( () => {
        if ( isHistoryLoading || isRegionsLoading ) return;

        const regionsMap = toRegionMap(regions)
        const features = {
            type: 'FeatureCollection',
            features: buildFeatures(history, regionsMap)
        }

        const flowLayer = new CanvasFlowmapLayer(features).addTo(map)
        flowLayer.bringToFront()

        return () => {
            map.removeLayer(flowLayer)
            flowLayer.remove()
        }

    }, [isHistoryLoading, isRegionsLoading, map] )

    return null
}