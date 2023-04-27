
import useSWR from 'swr'

const URI = process.env.NEXT_PUBLIC_BACKEND_URI
const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function useFetch<T>( path: string ) 
{
    const { data, error, isLoading } = useSWR(`${URI}${path}`, fetcher)
    return { data, error, isLoading } as { data: T, error: any, isLoading: boolean }
}