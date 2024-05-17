"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
    className?: string,
    mode?: "signin" | "login" | "signout",
    asChild?: boolean
}


export const LoginButton = ({ children, mode = "login", asChild }: LoginButtonProps) => {
    const route = useRouter();
    const clickHandler = () => {
        if (mode === "signin") {
            return route.push('/auth/sign-in')
        }
        if (mode === "signout") {
            signOut({ redirect: true, callbackUrl: "/" });
            return route.push('/');
        }

        route.push('/auth/login');
    }
    return (
        <span onClick={clickHandler} className="w-full">
            {children}
        </span>
    )
}