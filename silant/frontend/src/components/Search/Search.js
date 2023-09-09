import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [technicalModel, setTechnicalModel] = useState(null);
  const [engineModel, setEngineModel] = useState(null);
  const [transmissionModel, setTransmissionModel] = useState(null);
  const [drivingBridgeModel, setDrivingBridgeModel] = useState(null);
  const [controlledBridgeModel, setControlledBridgeModel] = useState(null);
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const url = 'http://127.0.0.1:8000/api/machines/';

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value.trim());
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setSearchAttempted(true);

    try {
      const response = await axios.get(url, {
        params: { machine_factory_number: searchTerm }
      });

      const machineData = Array.isArray(response.data) ? response.data : [];
      const matchingMachine = machineData.find(machine =>
        String(machine.machine_factory_number) === String(searchTerm)
      );
      setData(matchingMachine ? [matchingMachine] : []);

      if (matchingMachine) {
        Promise.all([
          axios.get(`http://127.0.0.1:8000/api/technical_models/${matchingMachine.technical_model}/`),
          axios.get(`http://127.0.0.1:8000/api/engine_models/${matchingMachine.engine_model}/`),
          axios.get(`http://127.0.0.1:8000/api/transmission_models/${matchingMachine.transmission_model}/`),
          axios.get(`http://127.0.0.1:8000/api/driving_bridge_models/${matchingMachine.driving_bridge_model}/`),
          axios.get(`http://127.0.0.1:8000/api/controlled_bridge_models/${matchingMachine.controlled_bridge_model}/`)
        ]).then(([technical, engine, transmission, drivingBridge, controlledBridge]) => {
          setTechnicalModel(technical.data);
          setEngineModel(engine.data);
          setTransmissionModel(transmission.data);
          setDrivingBridgeModel(drivingBridge.data);
          setControlledBridgeModel(controlledBridge.data);
        });
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   const handleReset = () => {
    setSearchTerm('');
    setData(null);
    setSearchAttempted(false);
  };

  return (
    <div className="search">
      <p className="search-label">Check the equipment and technical characteristics of Silant equipment</p>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-container">
          <input className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Enter the serial number of the machine"
          />
          <button className="search-btn" type="submit">Search</button>
          <button className="search-btn" type="button" onClick={handleReset}>Reset</button>
        </div>
      </form>

      {data && data.length > 0 ? (
          <div >
            <h2 className="search-info_label">Information about the configuration and technical characteristics of the machine with the number {data[0].machine_factory_number}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Technical model</th>
                   <th>Engine model</th>
                   <th>Engine serial number</th>
                   <th>Transmission serial number</th>
                   <th>Driving axle serial number</th>
                   <th>Serial number of the steered axle</th>
                   <th>Transmission model</th>
                   <th>Drive axle model</th>
                   <th>Steerable bridge model</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{technicalModel ? technicalModel.name : 'Loading...'}</td>
                  <td>{engineModel ? engineModel.name : 'Loading...'}</td>
                  <td>{data[0].engine_factory_number}</td>
                  <td>{data[0].transmission_factory_number}</td>
                  <td>{data[0].driving_bridge_factory_number}</td>
                  <td>{data[0].controlled_bridge_factory_number}</td>
                  <td>{transmissionModel ? transmissionModel.name : 'Loading...'}</td>
                  <td>{drivingBridgeModel ? drivingBridgeModel.name : 'Loading...'}</td>
                  <td>{controlledBridgeModel ? controlledBridgeModel.name : 'Loading...'}</td>
                </tr>
              </tbody>
            </table>
          </div>
      ) : searchAttempted && (
        <p>There is no data about a car with this serial number in the system.</p>
      )}
    </div>
);

};

export default Search;
