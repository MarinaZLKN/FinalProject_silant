import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MachineTable.css'
import {Link, useNavigate} from "react-router-dom";
import MachineFilter from "./MachineFilter";

const MachineTable = () => {
  const [machines, setMachines] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/machines/')
      .then(response => setMachines(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleRowClick = id => {
    navigate(`/machines/${id}`);
  };

  return (
      <>
        <div className="mach-filter">
          <MachineFilter />
        </div>
        {/*<h1 className="h1">Информация о машинах</h1>*/}
        {/*<table className="machine-table">*/}
        {/*  <thead>*/}
        {/*    <tr>*/}
        {/*      <th>Machine Factory Number</th>*/}
        {/*      <th>Engine Factory Number</th>*/}
        {/*      <th>Transmission Factory Number</th>*/}
        {/*      <th>Driving Bridge Factory Number</th>*/}
        {/*      <th>Controlled Bridge Factory Number</th>*/}
        {/*      <th>Delivery Contract</th>*/}
        {/*      <th>Shipment Date</th>*/}
        {/*      <th>Consignee</th>*/}
        {/*      <th>Delivery Address</th>*/}
        {/*      <th>Equipment</th>*/}
        {/*    </tr>*/}
        {/*  </thead>*/}
        {/*  <tbody>*/}
        {/*    {machines.map(machine => (*/}
        {/*     <tr*/}
        {/*      key={machine.id}*/}
        {/*      onClick={() => handleRowClick(machine.id)}*/}
        {/*      className="machine-row"*/}
        {/*    >*/}
        {/*        <td>{machine.machine_factory_number}</td>*/}
        {/*        <td>{machine.engine_factory_number}</td>*/}
        {/*        <td>{machine.transmission_factory_number}</td>*/}
        {/*        <td>{machine.driving_bridge_factory_number}</td>*/}
        {/*        <td>{machine.controlled_bridge_factory_number}</td>*/}
        {/*        <td>{machine.delivery_contract}</td>*/}
        {/*        <td>{machine.shipment_date}</td>*/}
        {/*        <td>{machine.consignee}</td>*/}
        {/*        <td>{machine.delivery_address}</td>*/}
        {/*        <td>{machine.equipment}</td>*/}
        {/*      </tr>*/}
        {/*    ))}*/}
        {/*  </tbody>*/}
        {/*</table>*/}
        </>
  );
};

export default MachineTable;