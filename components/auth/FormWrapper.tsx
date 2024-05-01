import Link from "next/link";
import { Button } from "../ui/button";

interface FormWrapperProps {
    children: React.ReactNode;
    title: string;
    backhref: string;
    backlabel: string
}

export default function FormWrapper({ children, title, backhref, backlabel }: FormWrapperProps) {
    return (
        <div className='grow md:max-w-xs sm:max-w-sm space-y-2 border rounded-xl shadow-md bg-white px-4 py-6 h-fit overflow-hidden'>
            <header className="text-center text-3xl mb-4 font-medium">
                {title}
            </header>
            <div>
                {children}
            </div>
            <footer className="text-center">
                <hr className="border-1 mt-4" />
                <Button variant={"link"}>
                    <Link href={backhref} className="">{backlabel}</Link>
                </Button>
            </footer>
        </div>
    )
}
