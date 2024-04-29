import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { PlusIcon } from "lucide-react";
import { PieChart } from "lucide-react";
import clsx from "clsx";

const links = [
    { label: "Home", href: "/dashboard", linkIcon: HomeIcon },
    { label: "New Task", href: "/dashboard/new-task", linkIcon: PlusIcon },
    { label: "Progress", href: "/dashboard/progress", linkIcon: PieChart },
]


export default function SideBarLinks() {
    return (
        <>
            {links.map(l => {
                const LinkIcon = l.linkIcon;
                return (
                    <Link
                        key={l.label}
                        href={l.href}
                        className={clsx("flex items-end bg-slate-100 p-2 rounded-md")}
                    >
                        <LinkIcon className="md:w-5 w-7 md:mr-1 m-0" />
                        <p className="md:block hidden text-sm">{l.label}</p>
                    </Link>
                )
            })}
        </>
    )
}
