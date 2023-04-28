
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { DropdownOption } from '~/types'


interface IDropdown {
    defaultRoute: DropdownOption
    routes: DropdownOption[]
    anchor: 'left' | 'center' | 'right'
    onChange?: (route: DropdownOption) => void
}

const translate = {
    'left' : '0%', 
    'center': '-50%',
    'right': '-100%'
}


export default function Dropdown( { defaultRoute, routes, anchor, onChange }: IDropdown ) 
{
    const [selected, setSelected] = useState<DropdownOption>(defaultRoute)
    const [show, setShow] = useState<boolean>(false)
    
    const toggleSelected = () => setShow( prev => !prev )

    const onClick = (route: DropdownOption) => () => {
        toggleSelected()
        setSelected( route )
        onChange && onChange(route)
    }

    const x = translate[anchor]
    
    return (
        <div className="relative">
            <div style={{ transform: `translate(${x}, -18px)` }} className='absolute justify-start flex flex-col rounded px-5 py-1 text-xl hover:bg-[#FFFFFFCC] transition-colors'>
                <div className="font-Azeret cursor-pointer flex items-center gap-2 whitespace-nowrap" onClick={toggleSelected}>
                    { selected.title } 
                    <div className="font-Open-Sans text-gray-900 text-sm truncate mt-1 mx-2">{ selected.desc }</div>
                    {show ? <FiChevronUp className='ml-auto' /> : <FiChevronDown className='ml-auto' />}
                </div>
                { show && routes.map( route => 
                    route.id === selected.id ? null : 
                        <div onClick={onClick(route)} className="font-Azeret flex flex-col mt-1 cursor-pointer rounded px-2 py-1 hover:bg-[#FFFFFFFF] whitespace-nowrap transition-colors" key={`prop-${route.id}`}>
                            {route.title}
                            <div className="font-Open-Sans text-gray-900 text-sm truncate">{route.desc}</div>
                        </div>
                ) }
            </div>
        </div>
    )
}