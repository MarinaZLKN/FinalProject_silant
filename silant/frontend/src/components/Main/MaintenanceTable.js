import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MachineTable.css';

const MaintenanceTable = () => {
  const [maintenanceData, setMaintenanceData] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/maintenance/')
      .then(response => setMaintenanceData(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
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
            <td>{maintenance.operating_time}</td>
            <td>{maintenance.order_number}</td>
            <td>{maintenance.date_of_order}</td>
            <td>{maintenance.organization.name}</td>
            <td>{maintenance.type_of_maintenance.name}</td>
            <td>{maintenance.machine.machine_factory_number}</td>
            <td>{maintenance.service_company.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaintenanceTable;