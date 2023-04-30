
import { Color, Genre } from "~/types";

export const GENRE_COLORS: {[genre: Genre]: Color } = {
    'Alternative': '#3f8efc', // --purple-pizzazz: #f55dd4ff;
    'Arabic':      '#384dabff', // --violet-blue: #384dabff;
    'Bollywood':   '#e36414', // --robin-egg-blue: #3fd7dfff;
    'Hip-Hop/Rap': '#0ead69', // --emerald: #2fdf81ff;
    'Latino':      '#ffd449', //  blue =    --dark-pastel-green: #42b83eff;
    'Pop':         '#ff006e', // --aureolin: #f3e32cff;
    'Pop/Rock':    '#f94144', // --orange-wheel: #f78a40ff;
    'Rock':        '#f94144', // --orange-wheel: #f78a40ff;
    'K-Pop':       '#00f5d4', // --tomato: #ff4e3eff;
    'J-Pop':       '#9d4edd', // --russet: #7a3a0fff;
    'Rap':         '#f00',
    'Sertanejo':   '#9d4edd'
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
            display: 'none',
        },
        title: {
            display: 'none',
        },
    },
}
    
export const CHART_COLORS = ["#ffc030", "#ff3300", "#fc5090", "#a156f3", "#0081bd"];