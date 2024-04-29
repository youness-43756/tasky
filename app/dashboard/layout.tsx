import HierarchyLinks from "@/components/dashboard/hierarchyLinks/hierarchyLinks";
import DesktopSidebar from "@/components/dashboard/sideBar/desktopSidebar";
import MobileSideBar from "@/components/dashboard/sideBar/mobileSideBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex md:gap-6">
            <DesktopSidebar />
            <MobileSideBar />
            <div className="grow py-8">
                <div className="p-4">
                    <HierarchyLinks />
                </div>
                {children}
            </div>
        </div>
    );
}
