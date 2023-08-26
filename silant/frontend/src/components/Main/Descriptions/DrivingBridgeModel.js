import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const DrivingBridgeModel = () => {
  const { id } = useParams();
  const [drivingModel, setDrivingModel] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/driving_bridge_models/${id}/`)
      .then((response) => {
        setDrivingModel(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  if (!drivingModel) {
    return <p>Loading data ...</p>;
  }

  return (
    <div>
      <p>{drivingModel.description}</p>
    </div>
  );
};

export default DrivingBridgeModel;