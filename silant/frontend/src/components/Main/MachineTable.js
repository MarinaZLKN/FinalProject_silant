import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MachineTable.css'

const MachineTable = () => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/machines/')
      .then(response => setMachines(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
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
        {machines.map(machine => (
          <tr key={machine.machine_factory_number}>
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
  );
};

export default MachineTable;