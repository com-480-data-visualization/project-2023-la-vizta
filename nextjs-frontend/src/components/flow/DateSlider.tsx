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
		label: <Label selected={currentTime == i} date={date} />
	})) 

	const _onChange = (event: Event, newValue: number) => {
		const v = labelToIndex(newValue)
		console.log(newValue, v);
		setCurrentTime(v) // TODO: round
		onChange(v)
	};

	useEffect( () => {
		const interval = setInterval( () => {
			setCurrentTime( t => t + 1 )
		}, [delay] )
		return () => clearInterval(interval)
	}, [isPlaying] )
    
    return (
        <Box sx={{ width: 1000 }}>
            <IOSSlider
				// TODO: set disabled?
                aria-label="Restricted values"
                defaultValue={0}
				value={isPlaying ? currentTime : undefined } // TODO: fix this?
                step={isPlaying ? 1 : null}
                marks={marks}
				onChange={_onChange}
            />
        </Box>
    );
}