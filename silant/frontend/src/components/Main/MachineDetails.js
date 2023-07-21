import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MachineDetails = () => {
  const { id } = useParams();
  const [machineData, setMachineData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/machines/${id}/`)
      .then(response => setMachineData(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!machineData) {
    return <p>Loading machine data...</p>;
  }

  return (
    <div>
      <h2>Machine Details</h2>
      <p>Machine Factory Number: {machineData.machine_factory_number}</p>
      <p>Engine Factory Number: {machineData.engine_factory_number}</p>
      <p>Transmission Factory Number: {machineData.transmission_factory_number}</p>
      <p>Driving Bridge Factory Number: {machineData.driving_bridge_factory_number}</p>
      <p>Controlled Bridge Factory Number: {machineData.controlled_bridge_factory_number}</p>
      <p>Delivery Contract: {machineData.delivery_contract}</p>
      <p>Shipment Date: {machineData.shipment_date}</p>
      <p>Consignee: {machineData.consignee}</p>
      <p>Delivery Address: {machineData.delivery_address}</p>
      <p>Equipment: {machineData.equipment}</p>
    </div>
  );
};

export default MachineDetails;