
import { useRouter } from 'next/router';
import { FaSpotify } from 'react-icons/fa'

import Dropdown from './Dropdown';

import { DropdownOption } from '~/types'

const routes: DropdownOption[] = [
    { id: '/genres', title: 'Genres', desc: 'Most listened genres per country' },
    { id: '/flow',   title: 'Flow',   desc: 'Flow graph of a given track' },
]

export default function Navbar( { NavComponent }: any ) 
{
    const router = useRouter()
    const defaultRoute = routes.find( r => r.id == router.pathname )

    const onChange = ( { id }: DropdownOption) => router.push(id)

    return (
        <div className="absolute flex justify-between items-center cursor-default px-6 py-5 top-2 ml-[50%] translate-x-[-50%] w-10/12 h-12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]">
            <Dropdown defaultRoute={defaultRoute} routes={routes} anchor='left' onChange={onChange}/>
            { NavComponent && <NavComponent /> }
            {/* <FaSpotify className='rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75'/> */}
        </div>
    )
}