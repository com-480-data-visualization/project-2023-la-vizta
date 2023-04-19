
import { useCallback } from 'react'
import { useMap, useMapEvent } from 'react-leaflet'
import { FiPlus, FiMinus } from 'react-icons/fi'
import { FaSpotify } from 'react-icons/fa'
import Dropdown from './Dropdown';

export default function Navbar() 
{
    const map = useMap()

    const onWrapperClick = (e) => {
        // TODO: make this work
        e.preventDefault()
        e.stopPropagation()
    }

    const updateView = (amount: number) => () => map.setView(map.getCenter(), map.getZoom() + amount)

    return (
        <div className="absolute flex justify-between items-center cursor-default px-6 py-3 mt-2 ml-[50%] translate-x-[-50%] w-10/12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]" onClick={onWrapperClick}>
            <div className='flex gap-3'>
                <FiPlus onClick={updateView(1)} className="rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75 transition-colors" />    
                <FiMinus onClick={updateView(-1)} className="rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75 transition-colors" />    
            </div>
            <Dropdown />
            <div>
                <FaSpotify className='rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75'/>
            </div>
        </div>
    )
}