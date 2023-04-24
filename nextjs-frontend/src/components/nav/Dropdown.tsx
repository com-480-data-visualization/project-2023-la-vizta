
import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useRouter } from 'next/router'

interface Proposition {
    name: string;
    req: string;
    desc: string;
}

const propositions: {[key: string]: Proposition} = {
    "genres": { name: 'Genres', req: '/genres', desc: 'Most listened genres per country' },
    "flow":   { name: 'Flow',   req: '/flow',   desc: 'Flow graph of a given track' },
}

export default function Dropdown() 
{
    const [selected, setSelected] = useState<keyof propositions>("genres")
    const [show, setShow] = useState<boolean>(false)
    const router = useRouter()

    const select = (key: keyof propositions) => () => {
        setSelected(key)
        setShow(false)
        router.push(propositions[key].req)
    }

    const onSelectedClick = () => {
        setShow( prev => !prev )
    }

    return (
        <div className="relative">
            <div className="absolute justify-start flex flex-col rounded px-5 py-2 text-xl hover:bg-[#FFFFFFCC] translate-x-[-50%] translate-y-[-22px] transition-colors">
                <div className="font-Azeret cursor-pointer flex items-center gap-2" onClick={onSelectedClick}>
                    { propositions[selected].name } 
                    <div className="font-Open-Sans text-gray-900 text-sm truncate mt-1 mx-2">{ propositions[selected].desc }</div>
                    {show ? <FiChevronUp /> : <FiChevronDown />}
                </div>
                { show &&
                    Object.keys(propositions).map( k => 
                        k === selected ? null : 
                            <div className="font-Azeret flex flex-col mt-1 cursor-pointer rounded px-2 py-1 hover:bg-[#FFFFFFFF] transition-colors" onClick={select(k)} key={`prop-${k}`}>
                                {propositions[k].name}
                                <div className="font-Open-Sans text-gray-900 text-sm truncate">{propositions[k].desc}</div>
                            </div>
                    )
                }
            </div>
        </div>
    )
}