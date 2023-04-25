
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Route {
    name: string;
    req: string;
    desc: string;
}

const routes: Route[] = [
    { name: 'Genres', req: '/genres', desc: 'Most listened genres per country' },
    { name: 'Flow',   req: '/flow',   desc: 'Flow graph of a given track' },
]

export default function Dropdown() 
{
    const [selected, setSelected] = useState<Route>(routes[0])
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    useEffect( () => {
        setSelected( routes.find( r => r.req == router.asPath ) )
    }, [router] )


    const onSelectedClick = () => {
        setShow( prev => !prev )
    }

    return (
        <div className="relative">
            <div className="absolute justify-start flex flex-col rounded px-5 py-2 text-xl hover:bg-[#FFFFFFCC]  translate-y-[-22px] transition-colors">
                <div className="font-Azeret cursor-pointer flex items-center gap-2" onClick={onSelectedClick}>
                    { selected.name } 
                    <div className="font-Open-Sans text-gray-900 text-sm truncate mt-1 mx-2">{ selected.desc }</div>
                    {show ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                { show && routes.map( prop => 
                    prop.req === selected.req ? null : 
                        <div onClick={() => router.push(prop.req)} className="font-Azeret flex flex-col mt-1 cursor-pointer rounded px-2 py-1 hover:bg-[#FFFFFFFF] transition-colors" key={`prop-${prop.name}`}>
                            {prop.name}
                            <div className="font-Open-Sans text-gray-900 text-sm truncate">{prop.desc}</div>
                        </div>
                ) }
            </div>
        </div>
    )
}