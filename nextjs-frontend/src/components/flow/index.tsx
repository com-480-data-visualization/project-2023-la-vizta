import { useState, useMemo } from 'react';
import { Popup } from 'react-leaflet';
import { useRouter } from 'next/router';
import { FiPlay, FiPause } from 'react-icons/fi'
import Color from 'color'

import LeafletCountry from '~/components/LeafletCountry';
import DateSlider from './DateSlider';
import Map from '~/components/Map';
import Navbar from '../nav/index';
import Dropdown from '../nav/Dropdown';
import Legend from './Legend';

import useFetch from '~/hooks/useFetch';

import { Country, DropdownOption, SmallTrack, Region, Rank, Streams } from '~/types';

interface RankStreams { rank: Rank, streams: Streams } 
type FlowPerRegion = { [region: Region]: RankStreams }
type FlowPerDatePerRegion = { [date: string]: FlowPerRegion } 

const maxRank = 50; // Depends on spotify_clean table

interface IMapComponent {
    regions: Country[]
    flow: FlowPerDatePerRegion
    date: number;
}

function MapComponent( { regions, flow, date }: IMapComponent ) {
   
    const dates = Object.values(flow)
    const decimalDate = date - Math.floor(date)
    const prevFlowsAtDate: FlowPerRegion = dates[Math.floor(date)]
    const nextFlowsAtDate: FlowPerRegion = dates[Math.ceil(date)]

    const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

    const getColor = (name: Region) => {
        const { rank: rank1, streams: streams1 } = prevFlowsAtDate[name]
        const { rank: rank2, streams: streams2 } = nextFlowsAtDate[name]

        const rank = lerp(rank1, rank2, decimalDate)
        const r = (1 - rank / maxRank) * 255
        const color = Color.rgb(0, r, 255).string()
        return { rank, color }
    }

    return (
        <>
        { prevFlowsAtDate && nextFlowsAtDate && regions
            .map( ( {name, geom}: Country, i: number) => {

                const { rank, color } = name in prevFlowsAtDate && name in nextFlowsAtDate 
                    ? getColor(name)
                    : { rank: 'None', color: '#000' }

                return (
                    <LeafletCountry
                        key={`country-${i}`}
                        color={color}
                        geom={geom}
                        onClick={() => {}}
                    > 
                        <Popup>
                            <div>
                                <p className="font-Playfair text-3xl">{name}</p>
                                <p className="font-Quicksand text-xl">Rank: <b>{rank}</b></p>
                            </div>
                        </Popup>
                    </LeafletCountry>
                );
            } )
        }
        </>
    )
}

interface IOverlayComponent {
    isPlaying: boolean;
    togglePlaying: () => void;
    flow: FlowPerDatePerRegion
    onChange: (date: number) => void;
}

function OverlayComponent( { isPlaying, togglePlaying, flow, onChange }: IOverlayComponent ) {

    const dates = Object.keys(flow)
    const Icon = isPlaying ? FiPause : FiPlay
	
    return (
        <>
        <div className='absolute flex justify-between items-center cursor-default px-6 pt-3 pb-6 bottom-3 ml-[50%] translate-x-[-50%] w-10/12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]'>
            <Icon onClick={togglePlaying} className="text-[#000000ac] rounded p-1 text-5xl cursor-pointer mt-3 hover:bg-[color:var(--white)] active:scale-75 transition-colors" />    
            <DateSlider isPlaying={isPlaying} dates={dates} onChange={onChange} />
        </div>
        <div className='absolute flex flex-col justify-between items-center cursor-default px-3 py-5 left-3 top-[50%] translate-y-[-50%] rounded backdrop-blur bg-[color:var(--white)] z-[9000]'>
            <div className='mb-5 text-black'>Ranks</div>
            <Legend />
        </div>
        </>
    )
}

interface INavComponent {
    tracks: SmallTrack[] | undefined;
    isTracksLoading: boolean
}

function NavComponent( { tracks, isTracksLoading }: INavComponent ) {
    const router = useRouter();
    
    if ( isTracksLoading || tracks === undefined ) return null

    const routes = tracks.map( ({ id, title, artist }: SmallTrack) => ({ id, title, desc: artist }) )

    const onChange = ( { id }: DropdownOption) => {
        router.replace( {
            query: { ...router.query, id },
        } );
    }

    return (
        <Dropdown 
            defaultRoute={routes[routes.length - 1]} 
            routes={routes} 
            anchor='right'
            onChange={onChange} />
    )
}


export default function Flow() {

    const { data: tracks, isLoading: isTracksLoading } = useFetch<SmallTrack[]>(`/flow/tracks`);

    const { query } = useRouter()
    const id: string | undefined = 'id' in query ? query.id : tracks !== undefined && tracks[tracks.length - 1].id

    const { data: regions, isLoading: isRegionsLoading } = useFetch<Country[]>("/countries/all");
	const { data: unorderedFlow, isLoading: isFlowLoading } = useFetch<FlowPerDatePerRegion>(`/flow/track?id=${id}`);

    const [date, setDate] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)

    const togglePlaying = () => setIsPlaying( prev => !prev )
    
    const loaded = !isRegionsLoading && !isFlowLoading && regions !== undefined

    const flow: FlowPerDatePerRegion = useMemo( () => 
        (isFlowLoading || unorderedFlow === undefined) 
            ? {} 
            :  Object.keys(unorderedFlow).sort().reduce( (acc, k) => { 
                acc[k] = unorderedFlow[k]; 
                return acc;
            }, {} as FlowPerDatePerRegion )
    , [isFlowLoading, unorderedFlow] ) 
	
    return (
        <>
		<Map>
			{ loaded && <MapComponent regions={regions} flow={flow} date={date} /> }
		</Map>
		<Navbar>
            <NavComponent tracks={tracks} isTracksLoading={isTracksLoading} />
        </Navbar>
        { loaded && <OverlayComponent isPlaying={isPlaying} togglePlaying={togglePlaying} flow={flow} onChange={setDate} /> }
		</>
    )
}
