import { signOut } from "next-auth/react";



export default function SignOut()
{
    return (
        <button className='m-4 py-3 px-6 rounded bg-zinc-200' onClick={() => signOut()}>Sign out</button>
    )
}