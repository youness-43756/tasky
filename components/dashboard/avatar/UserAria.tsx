"use client"
import { useSession } from 'next-auth/react'
import {
    LayoutDashboard,
    LoaderCircle,
    LogOut,
    Settings,
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
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LoginButton } from '@/components/auth/login-button'


export default function UserAria() {
    const pathname = usePathname();
    const { data, status }: { data: Session | null | undefined | string; status: any } = useSession();
    console.log({ data })
    return (
        <div>
            {status === "loading" && <LoaderCircle className="animate-spin" />}
            {status === "authenticated" && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className='cursor-pointer'>
                            <AvatarImage src={`${data?.user?.image}`} alt="avatar" />
                            <AvatarFallback>
                                <UserRound />
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        {pathname === '/' && (
                            <DropdownMenuGroup>
                                <Link href={'/dashboard'}>
                                    <DropdownMenuItem>
                                        <LayoutDashboard className="mr-2 h-4 w-4" />
                                        Dashboard
                                    </DropdownMenuItem>
                                </Link>
                            </DropdownMenuGroup>
                        )}
                        <DropdownMenuGroup>
                            <Link href={`/profile/${data?.user?.id}`}>
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <LoginButton mode='signout'>
                                <DropdownMenuItem>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    Log Out
                                </DropdownMenuItem>
                            </LoginButton>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    )
}
