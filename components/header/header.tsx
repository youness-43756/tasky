import Link from 'next/link'
import { pacifico } from '../ui/font/font'
import { Button } from '../ui/button'
import { authOptions } from '@/lib/authOptions/authOptions'
import { getServerSession } from 'next-auth';
import UserAria from '../dashboard/avatar/UserAria';
import { cn } from '@/lib/utils';
import { LoginButton } from '../auth/login-button';

export default async function Header() {
    const session = await getServerSession(authOptions);
    return (
        <header className='flex justify-between items-center md:px-4 md:h-[64px] h-[56px]'>
            <Link href={'/'} className={cn(
                "font-normal text-3xl text-lime-600",
                pacifico.className,
            )}>
                tasky
            </Link>

            {
                session ? <UserAria /> : (
                    <div className='space-x-1 flex'>
                        <LoginButton>
                            <Button size={'sm'} variant={'ghost'}>
                                Login
                            </Button>
                        </LoginButton>
                        <LoginButton mode='signin'>
                            <Button size={'sm'} variant={'lime'}>
                                Sign in
                            </Button>
                        </LoginButton>
                    </div>
                )
            }
        </header>
    )
}
