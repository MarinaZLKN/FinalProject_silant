import React, { useState } from 'react';
import axios from 'axios';

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
    <form onSubmit={handleSubmit}>
      <label>
        Date of Maintenance:
        <input
          type="date"
          name="date_of_maintenance"
          value={mainData.date_of_maintenance}
          onChange={handleChange}
        />
      </label>
      <label>
        Operating Time (hours):
        <input
          type="number"
          name="operating_time"
          value={mainData.operating_time}
          onChange={handleChange}
        />
      </label>
      <label>
        Order Number:
        <input
          type="text"
          name="order_number"
          value={mainData.order_number}
          onChange={handleChange}
        />
      </label>
      <label>
        Data of Order:
        <input
          type="date"
          name="data_of_order"
          value={mainData.data_of_order}
          onChange={handleChange}
        />
      </label>
      <label>
        Organization:
        <input
          type="text"
          name="organization"
          value={mainData.organization}
          onChange={handleChange}
        />
      </label>
      <label>
        Type of Maintenance:
        <input
          type="text"
          name="type_of_maintenance"
          value={mainData.type_of_maintenance}
          onChange={handleChange}
        />
      </label>
      <label>
        Machine:
        <input
          type="text"
          name="machine"
          value={mainData.machine}
          onChange={handleChange}
        />
      </label>
      <label>
        Service Company:
        <input
          type="text"
          name="service_company"
          value={mainData.service_company}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default MaintenanceForm;
