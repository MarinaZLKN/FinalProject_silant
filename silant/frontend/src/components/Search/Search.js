import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';

const Search = () => {
  const [data, setData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const url = 'http://127.0.0.1:8000/api/machines/';

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get(url, {
        params: { machine_factory_number: searchTerm }
      });
      const machineData = response.data[0];
      setData(machineData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        </div>
      </form>

      {data ? (
        <div>
          <h2 className="search-info_label">Информация о машине с номером {data.machine_factory_number}</h2>
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
                <td>{data.technical_model}</td>
                <td>{data.engine_model}</td>
                <td>{data.engine_factory_number}</td>
                <td>{data.transmission_factory_number}</td>
                <td>{data.driving_bridge_factory_number}</td>
                <td>{data.controlled_bridge_factory_number}</td>
                <td>{data.transmission_model}</td>
                <td>{data.driving_bridge_model}</td>
                <td>{data.controlled_bridge_model}</td>

              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p>Данных о машине с таким заводским номером нет в системе</p>
      )}
    </div>
  );
};

export default Search;