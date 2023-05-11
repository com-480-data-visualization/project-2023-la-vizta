import { useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Label } from 'recharts';


import useFetch from '../../hooks/useFetch';

import { Region, Track, Rank, TrackId } from "~/types";
import { CHART_COLORS, CHART_OPTIONS } from '~/constants';

const MAX_Y = 50

interface IStreamChart {
  region: Region
  tracks: Track[];
}

interface HistoriesData {
	date: string
	ranked: { id: TrackId, rank: Rank }[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
	if (!active || !payload)
		return null 
	return (
		<div className='border-none bg-white px-4 py-2 ml-3'>
			<p className='font-JetBrains text-lg'>{label}</p>
			{ payload.map( ({dataKey, color, value}: any, i: number) => (
				<div key={`payload-${i}`} className='flex items-center'>
					<div className='w-3 h-3 mx-3' style={{backgroundColor: color}}></div>
					<p className='font-JetBrains'>{dataKey}: <b>{value}</b></p>
				</div>
			) )}
		</div>
	);
};

export default function StreamChart( { region, tracks }: IStreamChart ) {

	const ids = tracks.map( t => t.id )
	const titles = tracks.map( t => t.title )
	
	const { data, isLoading } = useFetch<HistoriesData[]>(`/clean/histories?region=${region}&ids=${ids.join(',')}`)

	if ( isLoading || data === undefined ) 
		return null
	
	const datasets = data.map( ( { date, ranked }: HistoriesData, i: number) => ({
		date: date.split(' ')[0], 
		...ranked.reduce( (acc, cur) => {
<<<<<<< HEAD
			let { title } = tracks.find( t => t.id === cur.id )
			acc[title] = cur.rank === -1 ? NaN : (MAX_Y - cur.rank)
=======
			let { title } = tracks.find( t => t.id === cur.id ) as Track
			acc[title] = cur.rank === -1 ? NaN : cur.rank
>>>>>>> 4641c8deebfdaec92ac9b893bef483830ce3c58c
			return acc
		}, {} as any )
	}) )

    return (
		<ResponsiveContainer width="100%" height={400}>
			<LineChart
				data={datasets}
				margin={{
					top: 0,
					right: 50,
					left: 20,
					bottom: 20,
				  }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip content={<CustomTooltip />} wrapperStyle={{ outline: 'none' }} />
				<XAxis dataKey="date" angle={-20} textAnchor="end" dy={3}>
					<Label className='font-JetBrains' fill='black' position="insideBottomRight" dy={15} dx={50}>Date</Label>
				</XAxis>
				<YAxis domain={[0, MAX_Y]} allowDataOverflow={true} dx={-3} tickFormatter={(x, i) => {
					return i == 0 ? x + 1 : x
				}}>
					<Label className='font-JetBrains' fill='black' position="insideTopLeft" dy={0} dx={-15}>Rank</Label>
				</YAxis>
				{ datasets.map( (dataset, i) => 
					<Line key={`line-${i}`} type="monotone" dataKey={titles[i]} stroke={CHART_COLORS[i]} strokeWidth={3} />
				) }
			</LineChart>
		</ResponsiveContainer>
    )
};
