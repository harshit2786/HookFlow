import { Action, Trigger } from "@/models/zap";
import CustomActionNode, {
  ActionInputData,
} from "@/components/CustomNodes/Action";
import CustomTriggerNode, {
  InputTriggerData,
} from "@/components/CustomNodes/Trigger";
import { ReactFlow, ConnectionLineType, useReactFlow } from "@xyflow/react";
import { useEffect, useState } from "react";
import dagre from "@dagrejs/dagre";
import "@xyflow/react/dist/style.css";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Node {
  id: string;
  type: string;
  data: InputTriggerData | ActionInputData;
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
  data: InputTriggerData | ActionInputData;
}

interface Edge {
  id: string;
  source: string;
  target: string;
  animated: boolean;
  type: ConnectionLineType.SmoothStep;
}

const nodeTypes = {
  triggerType: CustomTriggerNode,
  actionType: CustomActionNode,
};

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));

const nodeWidth = 1200;
const nodeHeight = 200;

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  dagreGraph.setGraph({ rankdir: "TB" });

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
      targetPosition: "top",
      sourcePosition: "bottom",
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
  // const zapInstance = useRef(new Zap()).current;
  const { fitView } = useReactFlow();
  const [name,setName] = useState('');
  const [desc,setDesc] = useState('')
  const [trigger, setTrigger] = useState<null | Trigger>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [nodes, setNodes] = useState<FinalNode[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const navigate = useNavigate();
  const handleSubmit = async() => {
    if(trigger === null || name === '' || desc === "" || actions.length === 0){
      return;
    }
    try{
      const payload = {
      name,
      description :desc,
      triggerId : trigger.id,
      actions : actions.map((a) => ({order : a.order, actionsId : a.id, metaData : a.metaData}))
      }
      const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/zaps`, payload , {headers : {"Authorization" : `Bearer ${jwt}`}});
      navigate('/');
    } catch(e){
      console.log(e)
    }
  }
  const addAction = (a: Action) => {
    const newActions = [...actions];
    if (a.order > newActions.length) {
      return;
    } else if (a.order === newActions.length) {
      newActions.push(a);
    } else {
      newActions.splice(a.order, 0, a);
      for (let i = a.order + 1; i < newActions.length; i++) {
        newActions[i].order++;
      }
    }
    setActions(newActions);
  };
  function updateAction(a: Action) {
    const newActions = [...actions];
    if (a.order >= newActions.length) {
      return;
    }
    newActions[a.order] = a;
    setActions(newActions);
  }

  function removeAction(ind: number) {
    if (ind >= actions.length) {
      return;
    }
    const newActions = [...actions];
    newActions.splice(ind, 1);
    for (let i = ind; i < newActions.length; i++) {
      newActions[i].order--;
    }
    setActions(newActions);
  }

  useEffect(() => {
    const triggerNode: Node = {
      id: "trigger",
      type: "triggerType",
      data: {
        data: trigger,
        addAction: addAction,
        setTrigger,
      },
    };

    const actionNodes: Node[] = actions.map((a) => ({
      id: `action-${a.order}`,
      type: "actionType",
      data: {
        data: a,
        removeAction: removeAction,
        addAction: addAction,
        updateAction: updateAction,
      },
    }));

    const edges: Edge[] = actions.map((a, index) => ({
      id: index.toString(),
      type: ConnectionLineType.SmoothStep,
      source: a.order === 0 ? "trigger" : `action-${a.order - 1}`,
      target: `action-${a.order}`,
      animated: false,
    }));

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      [triggerNode, ...actionNodes],
      [...edges]
    );

    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    fitView();
  }, [trigger, actions]);
  useEffect(() => {
    const time = setTimeout(fitView, 200);
    return () => clearTimeout(time);
  }, [actions]);
  return (
    <div className="relative h-full w-full flex flex-col">
      <Dialog>
        <DialogTrigger>
        <Button className="absolute top-8 right-8 z-50" >Create Hook</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Create Hook</DialogTitle>
          <div className="flex flex-col gap-8" >
            <div className="flex gap-4 flex-col"  >
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex gap-4 flex-col"  >
              <Label>Description</Label>
              <Textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            </div>
          </div>
          <DialogFooter><Button onClick={handleSubmit} >Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>
      <ReactFlow
        proOptions={{ hideAttribution: true }}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
      />
    </div>
  );
};

export default CreateZap;
