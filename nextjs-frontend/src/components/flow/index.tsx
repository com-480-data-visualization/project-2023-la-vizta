import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import { FiPlay, FiPause } from 'react-icons/fi'
import Color from 'color'

import LeafletCountry from '~/components/LeafletCountry';
import DateSlider from './DateSlider';
import Map from '~/components/Map';
import Navbar from '../nav/index';
import Dropdown from '../nav/Dropdown';

import useFetch from '~/hooks/useFetch';

import { Country, Route, DropdownOption, SmallTrack, Region, Rank, Streams } from '~/types';

interface RankStreams { rank: Rank, streams: Streams } 
type FlowPerRegion = { [region: Region]: RankStreams }
type FlowPerDatePerRegion = { [date: string]: FlowPerRegion } 

const maxRank = 50; // Depends on spotify_clean table

interface IMapComponent {
    regions: Region[]
    flow: FlowPerDatePerRegion
    date: string;
}

function MapComponent( { regions, flow, date }: any ) {
   
    const dates = Object.values(flow)
    const prevFlowsAtDate: FlowPerRegion = dates[Math.floor(date)]
    const nextFlowsAtDate: FlowPerRegion = dates[Math.ceil(date)]

    const decimalDate = date - Math.floor(date)

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    return prevFlowsAtDate && nextFlowsAtDate && regions
        .filter( ( { name } ) => name in prevFlowsAtDate && name in nextFlowsAtDate )
        .map( ({name, geom}, i: number) => {
            const { rank: rank1, streams: streams1 } = prevFlowsAtDate[name]
            const { rank: rank2, streams: streams2 } = nextFlowsAtDate[name]

            const rank = lerp(rank1, rank2, decimalDate)
            const r = (1 - rank / maxRank) * 255
            const color = Color.rgb(0, r, 255).string()
            
            return (
                <LeafletCountry
                    key={`country-${i}`}
                    color={color}
                    geom={geom}
                    onClick={() => {}}
                />
            );
	    } )
}

interface IOverlayComponent {
    isPlaying: boolean;
    togglePlaying: () => void;
    flow: FlowPerDatePerRegion
    onChange: (option: DropdownOption) => void;
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
    const { data, isLoading } = useFetch<SmallTrack[]>(`/flow/tracks`);
    
    if ( isLoading ) return null

    const routes = data.map( ({ id, title, artist }: SmallTrack) => ({ id, title, desc: artist }) )

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


export default function Flow() {

    const { query } = useRouter()
    const { id } = query 
    
    const { data: regions, isLoading: isRegionsLoading } = useFetch<Country[]>("/countries/all");
	const { data: unorderedFlow, isLoading: isFlowLoading } = useFetch<FlowPerDatePerRegion>(`/flow/track?id=${id}`);

    const [date, setDate] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const togglePlaying = () => setIsPlaying( prev => !prev )
    
    const loaded = !isRegionsLoading && !isFlowLoading

    const flow: FlowPerDatePerRegion = useMemo( () => !isFlowLoading && 
        Object.keys(unorderedFlow).sort().reduce( (acc, k) => { 
            acc[k] = unorderedFlow[k]; 
            return acc;
        }, {} as FlowPerDatePerRegion )
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
