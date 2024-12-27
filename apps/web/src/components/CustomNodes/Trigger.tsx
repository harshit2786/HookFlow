import { Action } from "@/lib/zap";
import { Plus } from "lucide-react";
import { Handle, Position } from "@xyflow/react";
import { Button } from "../ui/button";

export interface InputTriggerData {
  data: string | null;
  setTrigger: (e: string | null) => void;
  addAction: (a: Action) => void;
}

function CustomTriggerNode({ data }: { data: object }) {
  console.log(data);
  return (
    <div className="flex flex-col h-60 nodrag w-[300px]">
      <Handle type="target" position={Position.Top} isConnectable={false} />
      <div className="w-full border border-divider h-24 flex justify-center items-center cursor-pointer "></div>
      <div className="flex-1 flex items-center justify-center">
        <div className="border w-0 h-full border-gray-300"></div>
      </div>
      <div className=" flex items-end justify-center">
        <Button size="icon"  className="mt-1 rounded-full " >
          <Plus/>
        </Button>
        {/* <div className=" cursor-pointer border p-1 rounded-full mt-1">
          <Plus />
        </div> */}
      </div>
      <Handle type="source" position={Position.Bottom} isConnectable={false} />
    </div>
  );
}

export default CustomTriggerNode;
