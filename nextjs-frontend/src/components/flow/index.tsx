
import Country from './Country';
import useFetch from '~/hooks/useFetch';


export default function Genres()
{
    const { data, isLoading } = useFetch("/clean/history?ids=3lCbsHaN1wCxyDzcNN2x4N;Argentina,5uD4fcXch2qE5LYeyDipA1;Spain");

    console.log(data);
    

    return !isLoading && <p></p>
}