import React, { useState, useEffect } from "react";
import axios from "axios";

const DrivingBridgeModelSelection = ({ setDrivingBridgeModel }) => {
  const [drivingBridgeModels, setDrivingBridgeModels] = useState([]);

  useEffect(() => {
    axios
      .get("/api/driving_bridge_models/")
      .then((response) => {
        console.log('Response data:', response.data);
        setDrivingBridgeModels(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log('Driving Bridge Models:', drivingBridgeModels);

  const handleChange = (event) => {
    setDrivingBridgeModel(event.target.value);
  };

  return (
    <select name="drivingBridgeModel" onChange={handleChange}>
      <option value="">Select Driving Bridge Model</option>
      {drivingBridgeModels.map(model => (
        <option key={model.id} value={model.id}>
          {model.name}
        </option>
      ))}
    </select>
  );
};

export default DrivingBridgeModelSelection;
