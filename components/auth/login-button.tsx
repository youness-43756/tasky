"use client"

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface LoginButtonProps {
    children: React.ReactNode,
    className?: string,
    mode?: "signin" | "login" | "signout" | "profile"|"dashboard" | string,
        asChild ?: boolean
}
export const LoginButton = ({ children, mode = "login", asChild }: LoginButtonProps) => {
    const route = useRouter();
    const clickHandler = async () => {
        if (mode === "signin") {
            return route.push(`${process.env.BASE_URL}/auth/sign-in`)
        }
        if (mode === "signout") {
            await signOut({ redirect: true, callbackUrl: "/" });
            return route.push(`${process.env.BASE_URL}`);
        }
        if (mode === "profile") {
            return route.push(`/`);
        }
        if (mode === "dashboard") {
            return route.push(`/dashboard`);
        }

        route.push('/auth/login');
    }
    return (
        <span onClick={clickHandler}>
            {children}
        </span>
    )
}