import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {auth, signIn, signOut} from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Nav = async () => {
    const session = await auth();
    return (
        <header className=' sm:px-14 px-5 py-5 bg-white shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center'>
                <Link href="/" >
                    <Image src="/logo.png" alt="logo" width={144} height={30}/>
                </Link>

                <div className='flex items-center gap-5 text-black'>
                    {session && session.user ? (
                        <>
                            <Link href="/startup/create">
                                <span className='max-sm:hidden font-bold text-xl'>Create</span>
                                <BadgePlus className='size-6 sm:hidden'/>
                            </Link>

                            <form action={async() =>{
                                "use server";
                                await signOut({redirectTo: "/"});
                            }}>
                                <button type='submit'>
                                <span className='max-sm:hidden text-red-500 font-bold text-xl'>Logout</span>
                                    <LogOut className='size-6 sm:hidden text-red-500'/>
                                </button>
                            </form>
                            <Link href={`/user/${session.id}`}>
                                <Avatar className='size-10'>
                                    <AvatarImage src={session?.user?.image || ''} alt={session?.user?.name || ''}/>
                                    <AvatarFallback>AV</AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server"

                            await signIn('github')
                        }}>
                            <button type='submit' className='font-bold text-xl text-pink-500'>Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Nav;