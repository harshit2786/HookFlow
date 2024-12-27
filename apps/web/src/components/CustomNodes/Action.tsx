import { Action } from "@/lib/zap";
import { Plus } from "lucide-react";
import { Handle, Position } from '@xyflow/react';

export interface ActionInput {
  data: Action ;
  removeAction: (e: number) => void;
  addAction : (a : Action) => void;
  updateAction : (a : Action) => void
}

function CustomActionNode({
  data
}: {
  data: object
}) {
  console.log("data",data)
  return (
    <div className="flex flex-col h-60 w-[300px]">
        <Handle
        type="target"
        position={Position.Top}
        isConnectable={false}
      />
      <div className="w-full border border-divider h-24 flex justify-center items-center " >
        {/* {data.id} */}
      </div>
      <div className="flex-1 flex items-end justify-center" >
        <Plus/>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={false}
      />
    </div>
  );
}

export default CustomActionNode;
