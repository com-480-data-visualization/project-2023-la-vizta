import { useState } from 'react';
import Color from 'color'

import Country from '~/components/Country';
import DateSlider from './DateSlider';
import Map from '~/components/Map';
import Navbar from '../nav/index';

import { Countries, Route } from '~/types';
import useFetch from '~/hooks/useFetch';


function MapComponent( { regions, flow, date }: any ) {
   
    const flowsAtDate = Object.values(flow)[date]

    return regions
        .filter( ([name, ..._]) => name in flowsAtDate )
        .map( (region, i) => {
            const name = region[0];
            const geom = region[4];
            const [rank, streams] = flowsAtDate[name]
            
            const r = (1 - rank / 100) * 255
            const color = Color.rgb(r, r, 255)
            
            return (
                <Country
                    key={`country-${i}`}
                    color={color.string()}
                    geom={geom}
                    onClick={() => {}}
                />
            );
	    } )
}

function OverlayComponent( { flow, onChange }: any ) {
    const dates = Object.keys(flow)
	return (
        <div className='absolute flex justify-between items-center cursor-default px-6 py-3 bottom-2 ml-[50%] translate-x-[-50%] w-10/12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]'>
            <DateSlider dates={dates} onChange={onChange} />
        </div>
    )
}

export default function Flow() {
    const { data: regions, isLoading: isRegionsLoading } = useFetch<Countries>("/countries/all");
	const { data: flow, isLoading: isFlowLoading } = useFetch("/clean/flow?id=5PjdY0CKGZdEuoNab3yDmX");

    const [date, setDate] = useState<number>(0)
    
    const loaded = !isRegionsLoading && !isFlowLoading
	
    return (
        <>
		<Map>
			{ loaded && <MapComponent regions={regions} flow={flow} date={date} /> }
		</Map>
		<Navbar />
        { loaded && <OverlayComponent flow={flow} onChange={setDate} /> }
		</>
    )
}