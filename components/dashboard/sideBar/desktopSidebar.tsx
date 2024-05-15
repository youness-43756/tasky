import SideBarLinks from "./sideBarLinks"
import SideBarBtn from "./sideBarBtn"
import UserAria from "../avatar/UserAria"

export default function DesktopSidebar() {
    return (

        <aside className="md:min-h-screen md:min-w-44 md:w-44 md:flex flex-col gap-3 py-6 border-r-2 md:pr-6 hidden">
            <SideBarLinks />
            <div className="grow hidden md:block bg-transparent rounded-md" />
            <UserAria />
        </aside>
    )
}
