import { Action, Trigger } from "@/models/zap";
import { Handle, Position } from "@xyflow/react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";
import AddTrigger from "../Custom/AddTrigger";
import ActionButton from "../Custom/ActionButton";

export interface InputTriggerData {
  data: Trigger | null;
  setTrigger: (e: Trigger | null) => void;
  addAction: (a: Action) => void;
}

function CustomTriggerNode({ data }: { data: InputTriggerData }) {
  const [isOpenTrigger, setIsOpenTrigger] = useState(false);
  useEffect(() => {
    setIsOpenTrigger(false);
  },[data.data?.id])
  return (
    <div className="flex flex-col h-48 nodrag w-[300px]">
      <Dialog
        open={isOpenTrigger}
        onOpenChange={(e: boolean) => setIsOpenTrigger(e)}
      >
        <DialogContent>
          <DialogTitle>Select a trigger</DialogTitle>
          <AddTrigger setTrigger={data.setTrigger} />
          <DialogFooter>
            {" "}
            <Button>Save</Button>{" "}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <div
        onClick={() => setIsOpenTrigger(true)}
        className="w-full bg-blue-950 text-gray-300 border-gray-500 border border-divider rounded-lg h-24 flex justify-center items-center cursor-pointer "
      >
        {data.data?.name ?? "Select a trigger"}
      </div>
      <div className="flex-1 flex items-center justify-center">
        <div className="border w-0 h-full border-gray-300"></div>
      </div>
      <div className=" flex items-end justify-center">
        <ActionButton index={0} addAction={data.addAction} />
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}

export default CustomTriggerNode;
