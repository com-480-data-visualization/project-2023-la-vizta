import { useMemo, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import useFetch from '../../hooks/useFetch';

import { Region, Track } from "~/types";
import { CHART_COLORS, CHART_OPTIONS } from '~/constants';
import { Rank, Streams } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



/*
streamPerTrackPerDate = [
  { 
    id: "name of the track",
    date: "2020",
    nbStream: 100,
  },

*/

interface IStreamChart {
  region: Region
  tracks: Track[];
}

interface HistoriesData {
	dates: string[]
	histories: { [id: TrackId]: { ranks: Rank[], streams: Streams[] } }
}

export default function StreamChart( { region, tracks }: IStreamChart ) {

	const ids = tracks.map( t => t.id )
	
	const { data, isLoading } = useFetch<HistoriesData>(`/clean/histories?region=${region}&ids=${ids.join(',')}`)

	if ( isLoading || data === undefined ) 
		return null
	
	const labels = data.dates.map( d => d.split(' ')[0] )

	const datasets = Object.values(data.histories).map( (rankStreams, i) => ({
		label: tracks[i].title,
		data: rankStreams.ranks,
		borderColor: CHART_COLORS[i],
		backgroundColor: CHART_COLORS[i]
	}) )


    return <Line options={CHART_OPTIONS} data={{labels, datasets}} />;
};