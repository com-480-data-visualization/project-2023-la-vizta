
import useSWR, { Fetcher } from 'swr'

const URI = process.env.NEXT_PUBLIC_BACKEND_URI

export default function useFetch<T>( path: string ) 
{
    const fetcher: Fetcher<T, string> = (query: string) => fetch(query).then(res => res.json())
    const { data, error, isLoading } = useSWR<T, Error>(`${URI}${path}`, fetcher)
    return { data, error, isLoading }
}