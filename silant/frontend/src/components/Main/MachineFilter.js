import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';

const MachineFilter = () => {
  const [technicalModels, setTechnicalModels] = useState([]);
  const [engineModels, setEngineModels] = useState([]);
  const [transmissionModels, setTransmissionModels] = useState([]);
  const [contrBridgeModels, setContrBridgeModels] = useState([]);
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/technical_models/").then((response) => {
      setTechnicalModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/engine_models/").then((response) => {
      setEngineModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/transmission_models/").then((response) => {
      setTransmissionModels(response.data);
    });
    axios.get("http://127.0.0.1:8000/api/controlled_bridge_models/").then((response) => {
      setContrBridgeModels(response.data);
    });
  }, []);

  const [selectedTechnicalModel, setSelectedTechnicalModel] = useState("");
  const [selectedEngineModel, setSelectedEngineModel] = useState("");
  const [selectedTransmissionModel, setSelectedTransmissionModel] = useState("");
  const [selectedContrBridgeModel, setSelectedContrBridgeModel] = useState("");

  const handleFilter = () => {
    axios
      .get("http://127.0.0.1:8000/api/machines/", {
        params: {
          technical_model__name: selectedTechnicalModel,
          engine_model__name: selectedEngineModel,
          transmission_model__name: selectedTransmissionModel,
          controlled_bridge_model__name : selectedContrBridgeModel,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMachines(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <div>
        <label>Technical Model:</label>
        <select onChange={(e) => setSelectedTechnicalModel(e.target.value)}>
          <option value="">Select Technical Model</option>
          {technicalModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Engine Model:</label>
        <select onChange={(e) => setSelectedEngineModel(e.target.value)}>
          <option value="">Select Engine Model</option>
          {engineModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Transmission Model:</label>
        <select onChange={(e) => setSelectedTransmissionModel(e.target.value)}>
          <option value="">Select Transmission Model</option>
          {transmissionModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Controlled Bridge Model:</label>
        <select onChange={(e) => setSelectedContrBridgeModel(e.target.value)}>
          <option value="">Select Controlled Bridge Model</option>
          {contrBridgeModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" onClick={handleFilter}>Filter</button>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Factory Number</th>
            <th>Engine Factory Number</th>
            <th>Transmission Factory Number</th>
            <th>Driving Bridge Factory Number</th>
            <th>Controlled Bridge Factory Number</th>
            <th>Delivery Contract</th>
            <th>Shipment Date</th>
            <th>Consignee</th>
            <th>Delivery Address</th>
            <th>Equipment</th>
          </tr>
        </thead>
        <tbody>
          {machines.map((machine) => (
            <tr key={machine.id} className="machine-row">
              <td>{machine.machine_factory_number}</td>
              <td>{machine.engine_factory_number}</td>
              <td>{machine.transmission_factory_number}</td>
              <td>{machine.driving_bridge_factory_number}</td>
              <td>{machine.controlled_bridge_factory_number}</td>
              <td>{machine.delivery_contract}</td>
              <td>{machine.shipment_date}</td>
              <td>{machine.consignee}</td>
              <td>{machine.delivery_address}</td>
              <td>{machine.equipment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineFilter;

