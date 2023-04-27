import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

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
	isPlaying: boolean;
	dates: string[];
	onChange: (v: number) => void
}

const delay = 50

function Label( { selected, date }: any ) {
	return (
		<p className={`text-xs rotate-45 translate-x-2 translate-y-1 font-JetBrains ${selected && 'font-bold'}`}>
			{date.split(' ')[0].replace('2021-', '')}
		</p>
	)
}

export default function DateSlider( { isPlaying, dates, onChange }: IDateSlider ) {

	const [currentTime, setCurrentTime] = useState(0)

	const indexToLabel = (i: number) => i * (100 / (dates.length - 1))
	const labelToIndex = (d: number) => Math.round(d * (dates.length - 1) / 100)

    const marks = dates.map( (date, i) => ({
		value: indexToLabel(i),
		label: <Label selected={Math.round(currentTime) == i} date={date} />
	})) 

	const _onChange = (event: Event, newValue: any) => {
		const v = labelToIndex(newValue)
		setCurrentTime(v)
	};

	useEffect( () => {
		if ( !isPlaying ) return;
		const interval = setInterval( () => {
			setCurrentTime( t => (t + 0.05) % (dates.length - 1) )
		}, delay )
		return () => clearInterval(interval)
	}, [isPlaying, dates.length] )

	useEffect( () => {
		onChange(currentTime)
	}, [currentTime] )
    
    return (
        <Box sx={{ width: '94%', marginRight: '1rem' }}>
            <IOSSlider
				slotProps={{
					thumb: {
						className: 'transition-all shadow',
					},
				}}
                aria-label="Restricted values"
                defaultValue={0}
				value={indexToLabel(currentTime)}
                step={null}
                marks={marks}
				onChange={_onChange}
            />
        </Box>
    );
}
