

import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";

const MachineFilter = () => {
  const [selectedTechnicalModel, setSelectedTechnicalModel] = useState("");
  const [selectedEngineModel, setSelectedEngineModel] = useState("");
  const [selectedTransmissionModel, setSelectedTransmissionModel] = useState("");
  const [selectedContrBridgeModel, setSelectedContrBridgeModel] = useState("");
  const [selectedDriveBridgeModel, setSelectedDriveBridgeModel] = useState("");
  const [technicalModels, setTechnicalModels] = useState([]);
  const [engineModels, setEngineModels] = useState([]);
  const [transmissionModels, setTransmissionModels] = useState([]);
  const [contrBridgeModels, setContrBridgeModels] = useState([]);
  const [driveBridgeModels, setDriveBridgeModels] = useState([]);
  const [filteredMachines, setFilteredMachines] = useState([]);
  const [machines, setMachines] = useState([]);

  const navigate = useNavigate();

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

    axios.get("http://127.0.0.1:8000/api/driving_bridge_models/").then((response) => {
      setDriveBridgeModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
      setMachines(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = machines.filter((machine) => {
      const technicalModelMatch = !selectedTechnicalModel || machine.technical_model === selectedTechnicalModel;
      const engineModelMatch = !selectedEngineModel || machine.engine_model === selectedEngineModel;
      const transmissionModelMatch = !selectedTransmissionModel || machine.transmission_model === selectedTransmissionModel;
      const contrBridgeModelMatch = !selectedContrBridgeModel || machine.controlled_bridge_model === selectedContrBridgeModel;
      const driveBridgeModelMatch = !selectedDriveBridgeModel || machine.driving_bridge_model === selectedDriveBridgeModel;

      return (
        technicalModelMatch &&
        engineModelMatch &&
        transmissionModelMatch &&
        contrBridgeModelMatch &&
        driveBridgeModelMatch
      );
    });

    setFilteredMachines(filteredData);
  }, [selectedTechnicalModel, selectedEngineModel, selectedTransmissionModel, selectedContrBridgeModel, selectedDriveBridgeModel, machines]);

  const handleFilter = () => {
    axios
      .get("http://127.0.0.1:8000/api/machines/", {
        params: {
          technical_model__name: selectedTechnicalModel,
          engine_model__name: selectedEngineModel,
          transmission_model__name: selectedTransmissionModel,
          controlled_bridge_model__name: selectedContrBridgeModel,
          driving_bridge_model__name: selectedDriveBridgeModel,
        },
      })
      .then((response) => {
        setMachines(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleReset = () => {
    setSelectedTechnicalModel("");
    setSelectedEngineModel("");
    setSelectedTransmissionModel("");
    setSelectedContrBridgeModel("");
    setSelectedDriveBridgeModel("");
  };

  const handleRowClick = id => {
    navigate(`/machines/${id}`);
  };

  return (
    <div>
      <div className="filter-group">
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
      <div className="filter-group">
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
      <div className="filter-group">
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
      <div className="filter-group">
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
      <div className="filter-group">
        <label>Driving Bridge Model:</label>
        <select onChange={(e) => setSelectedDriveBridgeModel(e.target.value)}>
          <option value="">Select Driving Bridge Model</option>
          {driveBridgeModels.map((model) => (
            <option key={model.id} value={model.name}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-btn">
        {/*<button type="button" className="search-btn" onClick={handleFilter}>Показать</button>*/}
        <button type="button" className="search-btn" onClick={handleReset}>Сбросить</button>
        <Link to="/create-machine">
          <button type="button" className="search-btn">Добавить</button>
        </Link>

      </div>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Factory Number</th>
            <th>Technical Model</th>
            <th>Engine Factory Number</th>
            <th>Engine Model</th>
            <th>Transmission Factory Number</th>
            <th>Transmission Model</th>
            <th>Driving Bridge Factory Number</th>
            <th>Driving Bridge Model</th>
            <th>Controlled Bridge Factory Number</th>
            <th>Controlled Bridge Model</th>
          </tr>
        </thead>
        <tbody>
          {filteredMachines.map((machine) => (
              <tr
              key={machine.id}
              onClick={() => handleRowClick(machine.id)}
              className="machine-row"
            >
              <td>{machine.machine_factory_number}</td>
              <td>{machine.technical_model}</td>
              <td>{machine.engine_factory_number}</td>
              <td>{machine.engine_model}</td>
              <td>{machine.transmission_factory_number}</td>
              <td>{machine.transmission_model}</td>
              <td>{machine.driving_bridge_factory_number}</td>
              <td>{machine.driving_bridge_model}</td>
              <td>{machine.controlled_bridge_factory_number}</td>
              <td>{machine.controlled_bridge_model}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineFilter;
