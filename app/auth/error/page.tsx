import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";

export default function page() {
    return (
        <main className="min-h-screen w-full flex flex-col gap-4 justify-center items-center">
            <p className="text-3xl font-semibold text-slate-700 drop-shadow-sm">Ooops! Something went wrong!</p>
            <LoginButton>
                <Button size={'sm'}>Back to login</Button>
            </LoginButton>
        </main>
    )
}
