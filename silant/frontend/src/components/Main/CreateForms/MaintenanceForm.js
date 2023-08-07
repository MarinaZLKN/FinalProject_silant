import React, { useState } from 'react';
import axios from 'axios';
import './MachineForm.css'

const MaintenanceForm = () => {
  const [mainData, setMainData] = useState({
    date_of_maintenance: '',
    operating_time: '',
    order_number: '',
    data_of_order: '',
    organization: '',
    type_of_maintenance: '',
    machine: '',
    service_company: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMainData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://127.0.0.1:8000/api/maintenances/', mainData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
      <div className="form-container_main">
          <h2 className="machine-form_h2">Добавить ТО</h2>
          <form onSubmit={handleSubmit}>
              <div className="form-row">
                  <label className="form-label">
                    Date of Maintenance:
                    <input
                      type="date"
                      name="date_of_maintenance"
                      value={mainData.date_of_maintenance}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Operating Time (hours):
                    <input
                      type="number"
                      name="operating_time"
                      value={mainData.operating_time}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Order Number:
                    <input
                      type="text"
                      name="order_number"
                      value={mainData.order_number}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Data of Order:
                    <input
                      type="date"
                      name="data_of_order"
                      value={mainData.data_of_order}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Organization:
                    <input
                      type="text"
                      name="organization"
                      value={mainData.organization}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Type of Maintenance:
                    <input
                      type="text"
                      name="type_of_maintenance"
                      value={mainData.type_of_maintenance}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Machine:
                    <input
                      type="text"
                      name="machine"
                      value={mainData.machine}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>
              <div className="form-row">
                  <label className="form-label">
                    Service Company:
                    <input
                      type="text"
                      name="service_company"
                      value={mainData.service_company}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </label>
              </div>

              <div className="form-buttons">
                  <button type="submit" className="search-btn">Создать</button>
              </div>
          </form>
      </div>

  );
};

export default MaintenanceForm;
