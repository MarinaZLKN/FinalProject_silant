import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MachineTable.css';

const MaintenanceTable = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/maintenances/')
      .then(response => setMaintenanceData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
      <>
      <h1 className="h1">Техническое обслуживание</h1>
      <table className="machine-table">
        <thead>
          <tr>
            <th>Date of Maintenance</th>
            <th>Operating Time</th>
            <th>Order Number</th>
            <th>Date of Order</th>
            <th>Organization</th>
            <th>Type of Maintenance</th>
            <th>Machine</th>
            <th>Service Company</th>
          </tr>
        </thead>
        <tbody>
          {maintenanceData.map(maintenance => (
            <tr key={maintenance.id}>
              <td>{maintenance.date_of_maintenance}</td>
              <td>{maintenance.operating_time}  м/час</td>
              <td>{maintenance.order_number}</td>
              <td>{maintenance.data_of_order}</td>
              <td>{maintenance.organization}</td>
              <td>{maintenance.type_of_maintenance}</td>
              <td>{maintenance.machine}</td>
              <td>{maintenance.service_company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default MaintenanceTable;