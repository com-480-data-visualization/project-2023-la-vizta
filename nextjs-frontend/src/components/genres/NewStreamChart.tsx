import { useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


import useFetch from '../../hooks/useFetch';

import { Region, Track, Rank } from "~/types";
import { CHART_COLORS, CHART_OPTIONS } from '~/constants';

interface IStreamChart {
  region: Region
  tracks: Track[];
}

interface HistoriesData {
	dates: string
	ranked: { id: TrackId, rank: Rank }[]
}

export default function StreamChart( { region, tracks }: IStreamChart ) {

	const ids = tracks.map( t => t.id )
	const titles = tracks.map( t => t.title )
	
	const { data, isLoading } = useFetch<HistoriesData[]>(`/clean/histories?region=${region}&ids=${ids.join(',')}`)

	if ( isLoading || data === undefined ) 
		return null
	
	const datasets = data.map( ( { date, ranked }, i) => ({
		date: date.split(' ')[0], 
		...ranked.reduce( (acc, cur) => {
			let { title } = tracks.find( t => t.id === cur.id )
			acc[title] = cur.rank === -1 ? NaN : cur.rank
			return acc
		}, {} )
	}) )

	console.log(datasets);

    return (
		<ResponsiveContainer width="100%" height={500}>
			<LineChart
				data={datasets}
				margin={{
					top: 0,
					right: 20,
					left: 0,
					bottom: 20,
				  }}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<Tooltip />
				<XAxis dataKey="date" angle={-20} textAnchor="end" dy={3} />
				<YAxis domain={[49, 1]} allowDataOverflow={true} dx={-3} />
				{ datasets.map( (dataset, i) => 
					<Line key={`line-${i}`} type="monotone" dataKey={titles[i]} stroke={CHART_COLORS[i]} strokeWidth={3} />
				) }
			</LineChart>
		</ResponsiveContainer>
    )
};