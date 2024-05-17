"use client"
import { signOut } from "next-auth/react"
export default function SignOutButton() {
    const signOutFunc = async () => {
        await signOut({ redirect: true, callbackUrl: "/" });
    }
    return (
        <button onClick={signOutFunc}>Log Out</button>
    )
}
