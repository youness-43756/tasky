import Link from "next/link";
import { Button } from "../ui/button";
import LoginWithGitHub from "./oAuthButtons/LoginWithGithub";

interface FormWrapperProps {
    children: React.ReactNode;
    title: string;
    backhref: string;
    backlabel: string
}

export default function FormWrapper({ children, title, backhref, backlabel }: FormWrapperProps) {
    return (
        <div className='grow md:max-w-sm sm:max-w-md space-y-2  sm:border sm:rounded-xl sm:shadow-md sm:bg-white max-w-[97%] px-4 py-6 h-fit overflow-hidden'>
            <header className="text-center text-2xl mb-6 font-medium">
                {title}
            </header>
            <section>
                <LoginWithGitHub />
            </section>
            <div>
                {children}
            </div>
            <footer className="text-center">
                <hr className="border-1 mt-5" />
                <Button variant={"link"}>
                    <Link href={backhref} className="mt-3 scal-100">{backlabel}</Link>
                </Button>
            </footer>
        </div>
    )
}
