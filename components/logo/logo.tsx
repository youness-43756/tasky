import Link from "next/link";

export default function Logo() {
    return (
        <Link href={"/"} className="md:text-3xl text-2xl font-semibold tracking-wider flex-1">Tasky</Link>
    )
}
