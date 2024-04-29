"use client"
import { usePathname } from "next/navigation";
import SigninForm from "./SigninForm";
import LoginForm from "./LoginForm";


export default function AuthFormPage() {
    const pathname = usePathname();
    if (pathname == "/auth/sign-in") {
        return (
            <SigninForm />
        )
    } else {
        return (
            <LoginForm />
        )
    }
}
