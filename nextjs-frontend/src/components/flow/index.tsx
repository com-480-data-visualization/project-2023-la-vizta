import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FiPlay, FiPause } from 'react-icons/fi'
import Color from 'color'

import Country from '~/components/Country';
import DateSlider from './DateSlider';
import Map from '~/components/Map';
import Navbar from '../nav/index';
import Dropdown from '../nav/Dropdown';

import { Countries, Route, DropdownOption } from '~/types';
import useFetch from '~/hooks/useFetch';


const maxRank = 50; // Depends on spotify_clean table

function MapComponent( { regions, flow, date }: any ) {
   
    const dates = Object.values(flow)
    const prevFlowsAtDate: any = dates[Math.floor(date)]
    const nextFlowsAtDate: any = dates[Math.ceil(date)]

    const decimalDate = date - Math.floor(date)

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    return prevFlowsAtDate && nextFlowsAtDate && regions
        .filter( ([name, ..._]: any) => name in prevFlowsAtDate && name in nextFlowsAtDate )
        .map( (region: any, i: number) => {
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

const routes: DropdownOption[] = [
    { id: '/genres', title: 'Genres', desc: 'Most listened genres per country' },
    { id: '/flow',   title: 'Flow',   desc: 'Flow graph of a given track' },
]

function NavComponent() {
    const router = useRouter();
    const { data, isLoading } = useFetch<any>(`/flow/tracks`);

    if ( isLoading ) return null

    const routes = data.map( (d: any) => ({ id: d[2], title: d[0], desc: d[1] }) )

    const onChange = ( { id }: DropdownOption) => {
        router.replace( {
            query: { ...router.query, id },
        } );
    }

    return (
        <Dropdown 
            defaultRoute={routes[0]} 
            routes={routes} 
            anchor='right'
            onChange={onChange} />
    )
}

// 1. 5PjdY0CKGZdEuoNab3yDmX
// 2. 0gplL1WMoJ6iYaPgMCL0gX

export default function Flow() {

    const { query } = useRouter()
    const { id } = query 
    
    const { data: regions, isLoading: isRegionsLoading } = useFetch<Countries>("/countries/all");
	const { data: unorderedFlow, isLoading: isFlowLoading } = useFetch<any>(`/flow/track?id=${id}`);

    const [date, setDate] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const togglePlaying = () => setIsPlaying( prev => !prev )
    
    const loaded = !isRegionsLoading && !isFlowLoading

    const flow = useMemo( () => !isFlowLoading && 
        Object.keys(unorderedFlow).sort().reduce( (acc, k) => { 
            acc[k] = unorderedFlow[k]; 
            return acc;
        }, {} )
    , [isFlowLoading, unorderedFlow] ) 
	
    return (
        <>
		<Map>
			{ loaded && <MapComponent isPlaying={isPlaying} regions={regions} flow={flow} date={date} /> }
		</Map>
		<Navbar NavComponent={NavComponent} />
        { loaded && <OverlayComponent isPlaying={isPlaying} togglePlaying={togglePlaying} flow={flow} onChange={setDate} /> }
		</>
    )
}
