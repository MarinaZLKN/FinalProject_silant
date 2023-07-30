import React, { useState, useEffect } from "react";
import axios from "axios";
import DrivingBridgeModelCreateForm from "../MachineForm/DrivingBrigdeModelSelection";

const DrivingBridgeForm = () => {
  const [formData, setFormData] = useState({
    drivingBridgeModel: "",
  });

  const [models, setModels] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/driving_bridge_models/")
      .then((response) => {
        setModels(response.data);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/machines/", formData)
      .then((response) => {
        console.log("Machine created successfully:", response.data);
        // Redirect here!!!
      })
      .catch((error) => {
        console.error("Error creating machine:", error);
      });
  };

  const [isAddModelModalOpen, setIsAddModelModalOpen] = useState(false);

  const handleCloseAddModelModal = () => {
    setIsAddModelModalOpen(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Driving Bridge Model:
          <select
            name="drivingBridgeModel"
            value={formData.drivingBridgeModel}
            onChange={handleChange}
            required
          >
            <option value="">Select Model</option>
            {models.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
            <option value="add_new">Add New Model</option>
          </select>
        </label>
        <button type="submit">Create Machine</button>
      </form>
      {isAddModelModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <DrivingBridgeModelCreateForm onCloseModal={handleCloseAddModelModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default DrivingBridgeForm;
