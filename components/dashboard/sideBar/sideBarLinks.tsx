"use client";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { PieChart } from "lucide-react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

const links = [
    { label: "Home", href: "/dashboard", linkIcon: HomeIcon },
    { label: "Progress", href: "/dashboard/progress", linkIcon: PieChart },
]

export default function SideBarLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map(l => {
                const LinkIcon = l.linkIcon;
                return (
                    <Link
                        key={l.label}
                        href={l.href}
                        className={clsx("flex items-end p-2 font-medium rounded-md hover:bg-slate-100 hover:text-lime-700", { "md:border-l-2 md:border-b-0 border-b-2 border-lime-700 font-semibold text-lime-700": pathname === l.href })}
                    >
                        <LinkIcon className="md:w-5 w-7 md:mr-3 m-0" />
                        <p className="md:block hidden text-sm">{l.label}</p>
                    </Link >
                )
            })}
        </>
    )
}
