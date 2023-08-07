import { useParams } from "react-router-dom";
import axios from "axios";
import React,{useEffect, useState} from "react";

const EngineModel = () => {
  const { id } = useParams();
  const [engineModel, setEngineModel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/engine_models/${id}/`)
      .then((response) => {
        setEngineModel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!engineModel) {
    return <p>Модель двигателя</p>;
  }

  return (
    <div>
      <p>{engineModel.description}</p>
    </div>
  );
};

export default EngineModel;