import { Trigger } from "@/models/zap";
import axios from "axios";
import { useEffect, useState } from "react";

const AddTrigger = ({
  setTrigger,
}: {
  setTrigger: (e: Trigger | null) => void;
}) => {
  const [availableTriggers, setAvailableTriggers] = useState<Trigger[]>([]);
  useEffect(() => {
    const fetchTriggers = async () => {
      try {
        const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
        const resp = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/zaps/available-triggers`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setAvailableTriggers(resp.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchTriggers();
  }, []);
  console.log(availableTriggers);
  return (
    <div>
      {availableTriggers.map((a) => (
        <div onClick={() => setTrigger(a)} className=" cursor-pointer ">
          {a.name}
        </div>
      ))}
    </div>
  );
};

export default AddTrigger;
