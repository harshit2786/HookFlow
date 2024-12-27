import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { UserNav } from "./user-nav"
import { useNavigate } from "react-router-dom"

export function Navbar() {
    const navigate = useNavigate();
  return (
    <div className="sticky top-0 z-50">
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-16 items-center px-4 container">
          <div className="flex items-center flex-1">
            <h1 onClick={() => navigate('/')} className=" cursor-pointer text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Hookflow
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {!window.location.pathname.includes("create") && <Button onClick={() => navigate('/create')} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create Hook
            </Button>}
            <UserNav />
          </div>
        </div>
      </nav>
    </div>
  )
}