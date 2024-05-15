import SideBarLinks from "./sideBarLinks";
import UserAria from "../avatar/UserAria";

export default function MobileSideBar() {
    return (
        <aside className="fixed bottom-0 left-0 right-0 h-16 px-2 justify-evenly gap-2 items-center md:hidden flex w-full
        bg-background shadow-md border-t-2
            ">
            <SideBarLinks />
            <UserAria />
        </aside>
    )
}
