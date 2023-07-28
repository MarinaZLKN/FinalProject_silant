import { useParams } from "react-router-dom";
import axios from "axios";
import React,{useEffect, useState} from "react";

const ControlledBridgeModel = () => {
  const { id } = useParams();
  const [conBrModel, setConBrModel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/controlled_bridge_models/${id}/`)
      .then((response) => {
        setConBrModel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!conBrModel) {
    return <p>Модель управляемого моста</p>;
  }

  return (
    <div>
      <p>{conBrModel.description}</p>
    </div>
  );
};

export default ControlledBridgeModel;