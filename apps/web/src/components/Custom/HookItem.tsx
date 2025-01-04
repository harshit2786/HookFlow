import { Zap } from "@/models/zap"
import { Calendar, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { formatTimestampToDateString } from "@/lib/utils"
import { DeleteDialog } from "./DeletDialog"
import { useState } from "react"
import axios from "axios"
import { Badge } from "../ui/badge"

const HookItem = ({zap} : {zap : Zap}) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleDelete = async() => {
        try{
        const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/zaps/${zap.id}` , {headers : {"Authorization" : `Bearer ${jwt}`}});
            window.location.reload();
        } catch(e){
            console.log(e)
        }
    }
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-0">
        <DeleteDialog onConfirm={handleDelete} hookName={zap.name} isOpen={isOpen} onClose={() => setIsOpen(false)}  />
      <div className="flex-1 min-w-0 mr-4">
        <div className="flex items-center gap-4 mb-1">
          <h3 className="font-medium text-white">{zap.name}</h3>
          <div className="flex items-center gap-1" >
          <Badge>{zap.trigger.name}</Badge>
          {zap.actions.map((a,index) => (
            <Badge key={index}>{a.name}</Badge>
          ))}
          </div>
          
        </div>
        <p className="text-sm text-muted-foreground truncate mb-2">
          {zap.description}
        </p>
        <div className="flex gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {formatTimestampToDateString(Number(zap.timeStamp))}
          </div>
        </div>

      </div>
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={() => setIsOpen(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export default HookItem
