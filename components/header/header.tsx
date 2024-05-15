import Link from 'next/link'
import { pacifico } from '../ui/font/font'
import { Button } from '../ui/button'
import { authOptions } from '@/lib/authOptions/authOptions'
import { getServerSession } from 'next-auth';
import UserAria from '../dashboard/avatar/UserAria';

export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className='flex justify-between items-center md:px-4 md:h-[64px] h-[56px]'>
            <Link href={'/'} className={` font-normal text-3xl text-lime-600`}>
                tasky
            </Link>

            {
                session ? <UserAria /> : (
                    <div className='space-x-1 flex'>
                        <Button size={'sm'} variant={'ghost'}>
                            <Link href={'/auth/login'}>Log in</Link>
                        </Button>
                        <Button size={'sm'} variant={'lime'}>
                            <Link href={'/auth/sign-in'}>Sign in</Link>
                        </Button>
                    </div>
                )
            }
        </header>
    )
}
