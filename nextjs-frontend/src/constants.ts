import Genres from '~/components/genres';
import Flow from '~/components/flow';

import { Color, GenreName } from "~/types";

export const GENRE_COLORS: {[genre: GenreName]: Color} = {
    'Alternative': '#f55dd4ff', // --purple-pizzazz: #f55dd4ff;
    'Arabic':      '#384dabff', // --violet-blue: #384dabff;
    'Bollywood':   '#3fd7dfff', // --robin-egg-blue: #3fd7dfff;
    'Hip-Hop/Rap': '#2fdf81ff', // --emerald: #2fdf81ff;
    'Latino':      '#0000ffff', //  blue =    --dark-pastel-green: #42b83eff;
    'Pop':         '#f3e32cff', // --aureolin: #f3e32cff;
    'Pop/Rock':    '#f78a40ff', // --orange-wheel: #f78a40ff;
    'K-Pop':       '#ff4e3eff', // --tomato: #ff4e3eff;
    'J-Pop':       '#7a3a0fff', // --russet: #7a3a0fff;
}


/* ==== Genres StreamChart ==== */

// const chartColors = [
//     '#CBAA18',
//     '#A2A19D',
//     '#CC7E18',
//     '#3E9A9D',
//     '#3E9A9D'
// ]

export const CHART_OPTIONS = {
    responsive: true,
    plugins: {
        legend: {
            position: "top" as const,
        },
        title: {
            display: true,
        },
    },
}
    
export const CHART_COLORS = ["#FF9D00", "#FF5400", "#B01A2E", "#0A9A9A", "#9A649A"];