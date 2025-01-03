import { Action } from "@/models/zap";
import { Handle, Position } from "@xyflow/react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import ActionButton from "../Custom/ActionButton";
import AddAction from "../Custom/AddAction";
import { Trash } from "lucide-react";
import { Button } from "../ui/button";

export interface ActionInputData {
  data: Action;
  removeAction: (e: number) => void;
  addAction: (a: Action) => void;
  updateAction: (a: Action) => void;
}

function CustomActionNode({ data }: { data: ActionInputData }) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col h-48 w-[300px]">
      <Dialog
        open={isOpen}
        onOpenChange={(e: boolean) => setIsOpen(e)}
      >
        <DialogContent>
          <DialogTitle>Select a trigger</DialogTitle>
          <AddAction callback={setIsOpen} type="update" index={data.data.order} updateAction={data.updateAction} />
        </DialogContent>
      </Dialog>
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <div onClick={() => setIsOpen(true)} className="w-full cursor-pointer bg-blue-950 text-gray-300 border-gray-500 rounded-lg border border-divider h-24 flex justify-between px-4 items-center ">
        {data.data?.name}
        <Button variant="ghost" size="icon" onClick={() => data.removeAction(data.data.order)} >
          <Trash/>
        </Button>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="border w-0 h-full border-gray-300"></div>
      </div>
      <div className=" flex items-end justify-center">
        <ActionButton index={data.data.order + 1} addAction={data.addAction} />
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}

export default CustomActionNode;
