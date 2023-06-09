
import React from 'react'
import { useRouter } from 'next/router';

import Dropdown from './Dropdown';

import { DropdownOption } from '~/types'

const routes: DropdownOption[] = [
    { id: '/genres', title: 'Genres', desc: 'Most listened genres per country' },
    { id: '/flow',   title: 'Flow',   desc: 'Evolution of a title in terms of ranking' },
]

interface INavbar {
    children?: React.ReactNode;
}

export default function Navbar( { children }: INavbar ) 
{
    const router = useRouter()
    const defaultRoute = routes.find( r => r.id == router.pathname ) || routes[0]

    const onChange = ( { id }: DropdownOption ) => router.push(id)

    return (
        <div className="absolute flex justify-between items-center cursor-default px-6 py-5 top-3 ml-[50%] translate-x-[-50%] w-10/12 h-12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]">
            <Dropdown defaultRoute={defaultRoute} routes={routes} anchor='left' onChange={onChange}/>
            { children }
            {/* <FaSpotify className='rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75'/> */}
        </div>
    )
}