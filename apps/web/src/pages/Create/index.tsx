import { Zap } from "@/lib/zap";
import CustomActionNode from "@/components/CustomNodes/Action";
import CustomTriggerNode from "@/components/CustomNodes/Trigger";
import { ReactFlow,ConnectionLineType } from "@xyflow/react";
import { useEffect, useRef, useState } from "react";
import dagre from '@dagrejs/dagre';
import '@xyflow/react/dist/style.css';

interface Node {
  id : string,
  type : string,
  data : object
}


interface FinalNode {
  targetPosition: string;
  sourcePosition: string;
  position: {
      x: number;
      y: number;
  };
  id: string;
  type: string;
  data: object;
}



interface Edge {
  id : string,
  source : string,
  target : string,
  animated : boolean,
  type : ConnectionLineType.SmoothStep
}
const nodeTypes = {
  triggerType: CustomTriggerNode,
  actionType: CustomActionNode,
};
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
 
const nodeWidth = 1200;
const nodeHeight = 300;

const getLayoutedElements = (nodes : Node[], edges : Edge[]) => {
  dagreGraph.setGraph({ rankdir: 'TB' });
 
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
 
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
 
  dagre.layout(dagreGraph);
 
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: 'top',
      sourcePosition: 'bottom',
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
 
    return newNode;
  });
 
  return { nodes: newNodes, edges };
};

const CreateZap = () => {
  const zapInstance = useRef(new Zap()).current;
  const [nodes, setNodes] = useState<FinalNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  useEffect(() => {
    const triggerNode : Node = {
        id: 'trigger',
        type: 'triggerType',
        data: {id :zapInstance.triggerId}
      }
      const triggerNode2 : Node = {
        id: 'trigger-2',
        type: 'triggerType',
        data: {id :zapInstance.triggerId}
      }
      const triggerEdge : Edge ={
        type : ConnectionLineType.SmoothStep,
        id : 'a-b',
        target : "trigger-2",
        source : "trigger",
        animated : false
      }
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements([triggerNode, triggerNode2], [triggerEdge]);
 
      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
  },[zapInstance.actions])
  return (
    <div className="h-full w-full flex flex-col bg-white">
      <ReactFlow proOptions={{ hideAttribution: true }} nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView />
    </div>
  );
};

export default CreateZap;
