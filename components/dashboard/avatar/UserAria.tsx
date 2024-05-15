"use client"
import { useSession } from 'next-auth/react'
import {
    Loader,
    LogOut,
    User,
    UserRound,
} from "lucide-react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { type Session } from 'next-auth'
import SignOutButton from '@/components/auth/oAuthButtons/SignOutButton'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function UserAria() {
    const pathname = usePathname();
    const { data, status }: { data: Session | null | undefined | string; status: any } = useSession();
    return (
        <div>
            {status === "loading" && <Loader className="animate-spin" />}
            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={`${data?.user?.image}`} alt="avatar" />
                            <AvatarFallback>
                                <UserRound />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        {pathname === '/' && (
                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <Link href={'/dashboard'}>Dashboard</Link>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>
                                <SignOutButton />
                            </span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}