import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const IOSSlider = styled(Slider)(({ theme }) => ({
	'& .MuiSlider-thumb': {
		height: 15,
		width: 15,
		backgroundColor: '#fff',
		boxShadow: iOSBoxShadow,
		'&:focus, &:hover, &.Mui-active': {
			boxShadow: '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)',
			'@media (hover: none)': {
				boxShadow: iOSBoxShadow,
			},
		},
	},
	'& .MuiSlider-rail': {
		opacity: 1,
		backgroundColor: '#bfbfbf',
	},
	'& .MuiSlider-track': {
		color: '#77f'
	},
}));

interface IDateSlider {
	dates: string[];
	onChange: (v: number) => void
}

export default function DateSlider( { dates, onChange }: IDateSlider ) {

	const [a, b] = useState(0)

    const marks = dates.map( (d, i) => ({
		value: i * (100 / (dates.length - 1)),
		label: <p className={`text-xs rotate-45 translate-x-2 translate-y-1 font-JetBrains ${a == i && 'font-bold'}`}>{d.split(' ')[0].replace('2021-', '')}</p>
	})) 

	const _onChange = (event: Event, newValue: number | number[]) => {
		const v = Math.round(newValue * (dates.length - 1) / 100)
		b(v)
		onChange(v)
	};
    
    return (
        <Box sx={{ width: 1000 }}>
            <IOSSlider
                aria-label="Restricted values"
                defaultValue={0}
                step={null}
                marks={marks}
				onChange={_onChange}
            />
        </Box>
    );
}