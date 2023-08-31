import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "./Auth/AuthContext";

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
  const { isAuthenticated, user } = useAuth();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
   axios.get("http://127.0.0.1:8000/api/machines/", { headers: commonHeaders }).then((response) => {
      setMachines(response.data);
   });}, []);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/technical_models/", { headers: commonHeaders }).then((response) => {
      setTechnicalModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/engine_models/", { headers: commonHeaders }).then((response) => {
      setEngineModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/transmission_models/", { headers: commonHeaders }).then((response) => {
      setTransmissionModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/controlled_bridge_models/", { headers: commonHeaders }).then((response) => {
      setContrBridgeModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/driving_bridge_models/", { headers: commonHeaders }).then((response) => {
      setDriveBridgeModels(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/machines/", { headers: commonHeaders }).then((response) => {
      console.log("Machines API response:", response);
      setMachines(response.data);
    });
  }, []);

  useEffect(() => {
    const filteredData = machines.filter((machine) => {
      const technicalModelMatch = !selectedTechnicalModel || machine.technical_model === parseInt(selectedTechnicalModel);
      const engineModelMatch = !selectedEngineModel || machine.engine_model === parseInt(selectedEngineModel);
      const transmissionModelMatch = !selectedTransmissionModel || machine.transmission_model === parseInt(selectedTransmissionModel);
      const contrBridgeModelMatch = !selectedContrBridgeModel || machine.controlled_bridge_model === parseInt(selectedContrBridgeModel);
      const driveBridgeModelMatch = !selectedDriveBridgeModel || machine.driving_bridge_model === parseInt(selectedDriveBridgeModel);

      return (
        technicalModelMatch &&
        engineModelMatch &&
        transmissionModelMatch &&
        contrBridgeModelMatch &&
        driveBridgeModelMatch
      );
    });
    console.log("Filtered machines based on selection:", filteredData);
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
        console.log("Machines after applying API filter:", response.data);
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

    console.log("Machines after resetting filters:", machines);
    setFilteredMachines(machines);

  };

  const handleRowClick = id => {
    navigate(`/machines/${id}`);
  };

  const getModelNameById = (id, models) => {

    const model = models.find(model => model.id === id);

    return model ? model.name : 'None';
  }


  return (
    <div>
      <div className="filter-group">
        <label>Техническая модель:</label>
        <select value={selectedTechnicalModel} onChange={(e) => setSelectedTechnicalModel(e.target.value)}>
          <option value="">Выберите техническую модель</option>
          {technicalModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Модель двигателя:</label>
        <select value={selectedEngineModel} onChange={(e) => setSelectedEngineModel(e.target.value)}>
          <option value="">Выберите модель двигателя</option>
          {engineModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Модель трансмиссии:</label>
        <select value={selectedTransmissionModel} onChange={(e) => setSelectedTransmissionModel(e.target.value)}>
          <option value="">Выберите модель трансмиссии </option>
          {transmissionModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Управляемый мост:</label>
        <select value={selectedContrBridgeModel} onChange={(e) => setSelectedContrBridgeModel(e.target.value)}>
          <option value="">Выберите мост</option>
          {contrBridgeModels.map((model) => (
            <option key={model.id} value={model.id}>
              {model.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Ведущий мост:</label>
        <select value={selectedDriveBridgeModel} onChange={(e) => setSelectedDriveBridgeModel(e.target.value)}>
          <option value="">Выберите мост</option>
          {driveBridgeModels.map((model) => (
            <option key={model.id} value={model.id}>
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
           {isAuthenticated && user && user.role === 'Менеджер' && (
            <Link to="/create-instance">
              <button type="button" className="search-btn">Справочник</button>
            </Link>
          )}


      </div>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Зав. № машины</th>
            <th>Техническая модель</th>
            <th>Дата отгрузки</th>
            <th>Зав. № двигателя</th>
            <th>Модель двигателя</th>
            <th>Зав. № трансмиссии</th>
            <th>Модель трансмиссии</th>
            <th>Зав. № ведущего моста</th>
            <th>Модель ведущего моста</th>
            <th>Зав. № управляемого моста</th>
            <th>Модель управляемого моста</th>
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
              <td>{getModelNameById(machine.technical_model, technicalModels)}</td>
              <td>{machine.shipment_date}</td>
              <td>{machine.engine_factory_number}</td>
              <td>{getModelNameById(machine.engine_model, engineModels)}</td>
              <td>{machine.transmission_factory_number}</td>
              <td>{getModelNameById(machine.transmission_model, transmissionModels)}</td>
              <td>{machine.driving_bridge_factory_number}</td>
              <td>{getModelNameById(machine.driving_bridge_model, driveBridgeModels)}</td>
              <td>{machine.controlled_bridge_factory_number}</td>
              <td>{getModelNameById(machine.controlled_bridge_model, contrBridgeModels)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MachineFilter;


