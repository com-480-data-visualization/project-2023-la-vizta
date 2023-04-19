
import { useState, useEffect } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

interface Proposition {
    name: string;
    req: string;
    desc: string;
}

const propositions: {[key: string]: Proposition} = {
    "genres": { name: 'Genres', req: '/genres', desc: 'Some more description on the thing selected' },
    "other":  { name: 'Other',  req: '/genres', desc: 'Some more description on the thing selected' },
    "fun":    { name: 'Fun',    req: '/genres', desc: 'Some more description on the thing selected' },
    "stuff":  { name: 'Stuff',  req: '/genres', desc: 'Some more description on the thing selected' },
}

export default function Dropdown() 
{
    const [selected, setSelected] = useState<keyof propositions>("genres")
    const [show, setShow] = useState<boolean>(false)

    const select = (key: keyof propositions) => () => {
        setSelected(key)
        setShow(false)
        // TODO: trigger update request
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
                    Object.keys(propositions).filter(k => k !== selected).map( k => 
                        <div className="font-Azeret flex flex-col mt-1 cursor-pointer rounded px-2 py-1 hover:bg-[#FFFFFFFF] transition-colors" onClick={select(k)} key={`prop-${k}`}>
                            {propositions[k].name}
                            <div className="font-Open-Sans text-gray-900 text-sm truncate">{ propositions[selected].desc }</div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}