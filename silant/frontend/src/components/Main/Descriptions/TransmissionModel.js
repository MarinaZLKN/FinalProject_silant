import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TransmissionModel = () => {
  const { id } = useParams();
  const [transmissionModel, setTransmissionModel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/transmission_models/${id}/`)
      .then((response) => {
        setTransmissionModel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!transmissionModel) {
    return <p>Модель трансмиссии</p>;
  }

  return (
    <div>
      <p>{transmissionModel.description}</p>
    </div>
  );
};

export default TransmissionModel;

