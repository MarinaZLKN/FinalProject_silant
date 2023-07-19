import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MachineDetails = () => {
  const { machineFactoryNumber } = useParams();
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/machines/${machineFactoryNumber}`)
      .then(response => setMachineData(response.data))
      .catch(error => console.log(error));
  }, [machineFactoryNumber]);

  if (!machineData) {
    return <p>Loading machine data...</p>;
  }

  return (
    <div>
      <h2>Machine Details</h2>
      <p>Machine Factory Number: {machine.machine_factory_number}</p>
      <p>Engine Factory Number: {machine.engine_factory_number}</p>
      <p>Transmission Factory Number: {machine.transmission_factory_number}</p>
      <p>Driving Bridge Factory Number: {machine.driving_bridge_factory_number}</p>
      <p>Controlled Bridge Factory Number: {machine.controlled_bridge_factory_number}</p>
      <p>Delivery Contract: {machine.delivery_contract}</p>
      <p>Shipment Date: {machine.shipment_date}</p>
      <p>Consignee: {machine.consignee}</p>
      <p>Delivery Address: {machine.delivery_address}</p>
      <p>Equipment: {machine.equipment}</p>
    </div>
  );
};

export default MachineDetails;