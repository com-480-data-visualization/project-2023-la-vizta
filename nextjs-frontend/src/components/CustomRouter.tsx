import { useRouter } from 'next/router';
import { log } from 'console';



interface ICustomRouter {
    match: string;
    component: any
}

export default function CustomRouter( { match, component } )
{
    const Component = component
    const { asPath } = useRouter()
    return asPath === match && <Component />
}