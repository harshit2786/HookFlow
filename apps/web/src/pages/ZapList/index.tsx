import HookItem from "@/components/Custom/HookItem";
import { Action, Zap } from "@/models/zap";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ZapList = () => {
  const [zaps, setZaps] = useState<Zap[]>([]);
  const navigate = useNavigate();
  const fetchZaps = async () => {
    try {
      const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
      const resp = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/zaps`,
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      setZaps(
        resp.data.data.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (a: any): Zap => ({
            id: a.id,
            name: a.name,
            description: a.description,
            timeStamp: a.timeStamp,
            trigger: {
              id: a.trigger.id,
              name: a.trigger.type.name,
            },
            actions: a.actions.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (b: any): Action => ({
                id: b.id,
                name: b.type.name,
                order: b.order,
              })
            ),
          })
        )
      );
    } catch (e) {
      console.log(e);
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    fetchZaps();
  }, []);
  return <div className="space-y-4 p-8 flex flex-col overflow-y-auto ">
  <div className="flex items-center justify-between">
    <h2 className="text-2xl text-white font-semibold tracking-tight">Your Hooks</h2>
  </div>
  <div className="rounded-md border bg-card">
    {zaps.map((hook) => (
      <HookItem
        key={hook.id}
        zap={hook}
      />
    ))}
  </div>
  </div>;
};

export default ZapList;
