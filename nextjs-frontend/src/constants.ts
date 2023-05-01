
import { Color, Genre } from "~/types";

export const GENRE_COLORS: {[genre: Genre]: Color } = {
    'Hip-Hop/Rap': '#0ead69',
    'Worldwide':   '#00ff00', 
    'Rap':         '#7bfd8d',
    'Latin':       '#ffd449',
    'Indian':      '#e36414',
    'Pop/Rock':    '#f94144', 
    'Pop':         '#ff006e', 
    'Brazilian':   '#ff0eff',
    'J-Pop':       '#9d4edd',
    'Arabic':      '#384dabff', 
    'Dance':       '#3f8efc',
    'Rock':        '#00ffff',
    'Others':      '#fff'
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