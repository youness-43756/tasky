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
            <header className="text-center text-2xl font-medium">
                {title}
            </header>
            <div>
                {children}
            </div>
            <footer className="text-center">
                <Button variant={"link"}>
                    <Link href={backhref} className="">{backlabel}</Link>
                </Button>
            </footer>
        </div>
    )
}
