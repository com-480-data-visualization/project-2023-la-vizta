import React from "react";
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

import { Track } from "~/types";
import { CHART_COLORS, CHART_OPTIONS } from '~/constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const labels = ["January", "February", "March", "April", "May", "June", "July"];

/*
streamPerTrackPerDate = [
  { 
    id: "name of the track",
    date: "2020",
    nbStream: 100,
  },

*/



interface IStreamChart {
    tracks: Track[];
}

export const StreamChart = ( { tracks }: IStreamChart ) => {
  console.log(tracks);

  let dataset = [];
  for (let i = 0; i < tracks.length; i++) {
    dataset.push({
      label: tracks[i].title,
      data: [65 + i, 59 + i, 80 + i, 81 + i, 56 + i, 55 + i, 40 - i],
      borderColor: CHART_COLORS[i],
      backgroundColor: CHART_COLORS[i],
    });
  }

  const data = {
    labels /* : date streamPerTrackPerDate.map( (element) => element.date) */,
    datasets: dataset,
  };

  return <Line options={CHART_OPTIONS} data={data} />;
};
export default StreamChart;
