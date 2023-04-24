import Country from './Country';
import useFetch from '~/hooks/useFetch';

import CanvasFlowmapLayer from '~/lib/CanvasFlowmapLayer'

const toGeoJson = (centerA, centerB) => {
    return {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": [109.6091129, 23.09653465]
        },
        "properties": {
          "origin_id": 238,
          "origin_lon": 109.6091129,
          "origin_lat": 23.09653465,
          "destination_id": 1,
          "destination_lon": 18.39002966,
          "destination_lat": 9.149969909
        }
    }
}

const buildFeatures = (data: any) => {
    const explored = new Set()
    const features = []
    let start = undefined
    for ( const [region, ..._] of data )
    {
        if ( explored.has(region) ) 
            continue
        if ( start !== undefined )
        {
            const feature = toGeoJson(start, region)
            features.push(feature)
        }
        explored.add(region)
        start = region
    }
    return features
}

export default function Genres()
{
    const { data: history, isLoading: isHistoryLoading } = useFetch("/clean/history?id=3lCbsHaN1wCxyDzcNN2x4N");
    const { data: regions, isLoading: isRegionsLoading } = useFetch("/country/all");

    if ( !isHistoryLoading && !isRegionsLoading )
    {
        console.log('regions', regions)
        const features = buildFeatures(history)
        console.log(features);
    }
        
    // const flowLayer = L.canvasFlowmapLayer( features, {
    //     pathDisplayMode: 'selection',
    //     animationStarted: true,
    //     animationEasingFamily: 'Cubic',
    //     animationEasingType: 'In',
    //     animationDuration: 2000
    // }).addTo(map);
    

    return !isRegionsLoading && !isHistoryLoading && <p></p>
}