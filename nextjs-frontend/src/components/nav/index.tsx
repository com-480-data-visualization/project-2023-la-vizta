
import { FaSpotify } from 'react-icons/fa'
import Dropdown from './Dropdown';

export default function Navbar() 
{
    return (
        <div className="absolute flex justify-between items-center cursor-default px-6 py-3 top-2 ml-[50%] translate-x-[-50%] w-10/12 rounded backdrop-blur bg-[color:var(--white)] z-[9000]">
            <Dropdown />
            <FaSpotify className='rounded p-1 text-4xl cursor-pointer hover:bg-[color:var(--white)] active:scale-75'/>
        </div>
    )
}