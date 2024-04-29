"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export default function HierarchyLinks() {
    const pathname = usePathname().split("/").filter(el => el !== "");
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    {pathname.map(path => (
                        <>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {path == pathname[pathname.length - 1] ? (
                                    <BreadcrumbPage>{path}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={`/${path}`}>{path}</Link>
                                    </BreadcrumbLink >
                                )}
                            </BreadcrumbItem>
                        </>

                    ))}
                </BreadcrumbList >
            </Breadcrumb >
        </>
    )
}
