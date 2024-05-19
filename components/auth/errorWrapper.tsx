import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { ErrorWrapperProps } from "@/lib/dataType/dType";

export default function ErrorWrapper({ message, buttonLabel, backUrl }: ErrorWrapperProps) {
    return (
        <main className="min-h-screen w-full flex flex-col sm:gap-8 gap-4 justify-center items-center">
            <p className="sm:text-3xl text-2xl tracking-wide font-semibold text-slate-500/25 drop-shadow-md">
                {message}
            </p>
            <LoginButton mode={backUrl}>
                <Button size={'sm'}>
                    {buttonLabel}
                </Button>
            </LoginButton>
        </main>
    )
}
