import Link from "next/link";
import { pacifico } from "../font/font";

export default function Logo() {
    return (
        <Link href={"/"} className={`${pacifico.className} text-3xl text-lime-600 font-semibold  tracking-wider flex-1 flex items-end`}><div className="bg-lime-700 w-2 h-2 rounded-full mb-1"></div>tasky</Link>
    )
}
