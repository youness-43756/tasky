"use client"

import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
    mode?: "signin" | "login",
    asChild?: boolean
}


export const LoginButton = ({ children, mode = "login", asChild }: LoginButtonProps) => {
    const route = useRouter();
    const clickHandler = () => {
        if (mode === "signin") {
            return route.push('/auth/sign-in')
        }

        route.push('/auth/login');
    }
    return (
        <span onClick={clickHandler}>
            {children}
        </span>
    )
}