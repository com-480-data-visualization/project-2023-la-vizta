import { useState } from 'react';
import { FiPlay, FiPause } from 'react-icons/fi'
import Color from 'color'

import Country from '~/components/Country';
import DateSlider from './DateSlider';
import Map from '~/components/Map';
import Navbar from '../nav/index';

import { Countries, Route } from '~/types';
import useFetch from '~/hooks/useFetch';


const maxRank = 50; // Depends on spotify_clean table

function MapComponent( { regions, flow, date }: any ) {
   
    const dates = Object.values(flow)
    const prevFlowsAtDate = dates[Math.floor(date)]
    const nextFlowsAtDate = dates[Math.ceil(date)]

    const decimalDate = date - Math.floor(date)

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    // TODO: don't filter but set rank to 50 if name not in flowsAtDate

    return regions
        .filter( ([name, ..._]) => name in prevFlowsAtDate && name in nextFlowsAtDate )
        .map( (region, i) => {
            const name = region[0];
            const geom = region[4];

            const [rank1, streams1] = prevFlowsAtDate[name]
            const [rank2, streams2] = nextFlowsAtDate[name]

            const rank = lerp(rank1, rank2, decimalDate)
            const r = (1 - rank / maxRank) * 255
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

function OverlayComponent( { isPlaying, togglePlaying, flow, onChange }: any ) {

    const dates = Object.keys(flow)
    const Icon = isPlaying ? FiPause : FiPlay
	
    return (
        <div className='absolute flex justify-between items-center cursor-default px-6 py-3 bottom-2 ml-[50%] translate-x-[-50%] w-10/12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]'>
            <Icon onClick={togglePlaying} className="rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75 transition-colors" />    
            <DateSlider isPlaying={isPlaying} dates={dates} onChange={onChange} />
        </div>
    )
}

export default function Flow() {
    const { data: regions, isLoading: isRegionsLoading } = useFetch<Countries>("/countries/all");
	const { data: flow, isLoading: isFlowLoading } = useFetch("/clean/flow?id=5PjdY0CKGZdEuoNab3yDmX");

    const [date, setDate] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const togglePlaying = () => setIsPlaying( prev => !prev )
    
    const loaded = !isRegionsLoading && !isFlowLoading
	
    return (
        <>
		<Map>
			{ loaded && <MapComponent isPlaying={isPlaying} regions={regions} flow={flow} date={date} /> }
		</Map>
		<Navbar />
        { loaded && <OverlayComponent isPlaying={isPlaying} togglePlaying={togglePlaying} flow={flow} onChange={setDate} /> }
		</>
    )
}