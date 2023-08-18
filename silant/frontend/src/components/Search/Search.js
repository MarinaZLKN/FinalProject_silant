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
      <p className="search-label">Проверьте комплектацию и технические характеристики техники Силант</p>
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <div className="search-container">
          <input className="search-input"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Введите заводской номер машины"
          />
          <button className="search-btn" type="submit">Поиск</button>
          <button className="search-btn" type="button" onClick={handleReset}>Сброс</button>
        </div>
      </form>

      {data && data.length > 0 ? (
          <div >
            <h2 className="search-info_label">Информация о машине с номером {data[0].machine_factory_number}</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Техническая модель</th>
                  <th>Модель двигателя</th>
                  <th>Зав. № двигателя</th>
                  <th>Зав. № трансмиссии</th>
                  <th>Зав. № ведущего моста</th>
                  <th>Зав. № управляемого моста</th>
                  <th>Модель трансмиссии</th>
                  <th>Модель ведущего моста</th>
                  <th>Модель управляемого моста</th>
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
        <p>Данных о машине с таким заводским номером нет в системе</p>
      )}
    </div>
);

};

export default Search;
