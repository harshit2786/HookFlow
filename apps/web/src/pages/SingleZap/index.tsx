import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Zap {
    id : string,
    name : string,
    description : string,
    timestamp : string,
    trigger : {
        id : string,
        name : string,
        typeId : string
    },
    actions : {
        id : string,
        metadata : object,
        order : number,
        typeId : string,
        typeName : string
    }[]
}

const SingleZap = () => {
  const { zapId } = useParams();
  const [zap,setZap] = useState<Zap | null>(null);
  console.log("zappp",zap)
  useEffect(() => {
    const fetchZap = async () => {
      try {
        const jwt = JSON.parse(sessionStorage.getItem("userData") ?? "{}")?.jwt;
        const resp = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/zaps/${zapId}`,
          { headers: { Authorization: `Bearer ${jwt}` } }
        );
        setZap(resp.data.data)
      } catch (e) {
        console.log(e);
      }
    };
    if (zapId) {
      fetchZap();
    }
  }, [zapId]);
  return <div></div>;
};

export default SingleZap;
