import { Action, AvailableActions } from "@/models/zap";
import axios from "axios";
import { useEffect, useState } from "react";

interface ActionUpdate {
  index: number;
  type: "update";
  updateAction: (a: Action) => void;
  callback : (e : boolean) => void
}

interface ActionAdd {
  index: number;
  type: "add";
  addAction: (a: Action) => void;
  callback : (e : boolean) => void
}

const AddAction = (props: ActionAdd | ActionUpdate) => {
  const [availableActions, setAvailableActions] = useState<AvailableActions[]>(
    []
  );
  console.log(availableActions);
  const handleSelect = (a: AvailableActions) => {
    if (props.type === "add") {
      props.addAction({
        id: a.id,
        order: props.index,
        name: a.name,
        metaData: {},
      });
    } else {
      props.updateAction({
        id: a.id,
        order: props.index,
        name: a.name,
        metaData: {},
      });
    }
    props.callback(false);
  };
  useEffect(() => {
    const fetchTriggers = async () => {
      try {
        const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
        const resp = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/zaps/available-actions`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setAvailableActions(resp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTriggers();
  }, []);
  return (
    <div>
      {availableActions.map((a) => (
        <div onClick={() => handleSelect(a)} className=" cursor-pointer ">
          {a.name}
        </div>
      ))}
    </div>
  );
};

export default AddAction;
