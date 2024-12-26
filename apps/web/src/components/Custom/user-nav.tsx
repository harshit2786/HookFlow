import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"

export function UserNav() {
    const navigate = useNavigate();
    const userData = JSON.parse(sessionStorage.getItem('userData') ?? "{}");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full">
            {userData?.userName?.charAt(0)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
            {userData?.userName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
            {userData?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {sessionStorage.removeItem('userData'); navigate('/sign-in')}} className=" cursor-pointer text-destructive">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}