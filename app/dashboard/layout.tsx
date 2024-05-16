// import HierarchyLinks from "@/components/dashboard/hierarchyLinks/hierarchyLinks";
import UserAria from "@/components/dashboard/avatar/UserAria";
import DesktopSidebar from "@/components/dashboard/sideBar/desktopSidebar";
import MobileSideBar from "@/components/dashboard/sideBar/mobileSideBar";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex md:gap-6">
            <DesktopSidebar />
            <MobileSideBar />
            <div className="grow py-8 bg-red-600 h-[1500px]">
                {children}
            </div>
        </div>
    );
}
