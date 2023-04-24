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
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of the

const labels = ["January", "February", "March", "April", "May", "June", "July"];

/*
streamPerTrackPerDate = [
  { 
    id: "name of the track",
    date: "2020",
    nbStream: 100,
  },

*/

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

export const StreamChart = ({
  tracks,
  color,
}: {
  tracks: Track[];
  color: string[];
}) => {
  console.log(tracks);
  console.log(color[0]);

  let dataset = [];
  for (let i = 0; i < tracks.length; i++) {
    dataset.push({
      label: tracks[i].title,
      data: [65 + i, 59 + i, 80 + i, 81 + i, 56 + i, 55 + i, 40 - i],
      borderColor: color[i],
      backgroundColor: color[i],
    });
  }

  const data = {
    labels /* : date streamPerTrackPerDate.map( (element) => element.date) */,
    datasets: dataset,
  };

  return <Line options={options} data={data} />;
};
export default StreamChart;
