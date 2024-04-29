import { Button } from '@/components/ui/button'
import { LogOutIcon } from 'lucide-react'

export default function SideBarBtn() {
    return (
        <Button variant={"danger"} size={"icon"}>
            <p className='md:block hidden'>Log out</p>
            <LogOutIcon className="md:ml-2 m-0 md:w-5 w-7" />
        </Button>
    )
}
