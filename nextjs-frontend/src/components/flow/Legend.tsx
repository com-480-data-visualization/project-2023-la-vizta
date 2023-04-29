

import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';

const iOSBoxShadow = '0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.13),0 0 0 1px rgba(0,0,0,0.02)';

const LegendSlider = styled(Slider)( () => ({
	marginRight: '20px !important',
	'& .MuiSlider-thumb': {
		display: 'none'
	},
	'& .MuiSlider-rail': {
		opacity: 1,
        width: '12px',
        borderRadius: 3,
		background: 'linear-gradient(cyan, blue)',
	},
    '& .MuiSlider-mark': {
		opacity: 0,
	},
    '& .MuiSlider-track': {
		opacity: 0,
	},
}));


function Label( { i }: { i: number } ) {
	const label = 50 - i * 10 || 1
	return (
		<p className='text-md text-black font-JetBrains -translate-x-1'>
			{label}
		</p>
	)
}

const mark = (i: number) => ({value: i * 20, label: <Label i={i} />})
const marks = Array.from({length: 6}, (v, i) => mark(i)) 

export default function Legend() {
    return (
        <Box sx={{height: '15vh' }}>
            <LegendSlider
				disabled
                orientation="vertical"
                aria-label="Disabled slider"
                step={10}
                marks={marks}
            />
        </Box>
    );
}