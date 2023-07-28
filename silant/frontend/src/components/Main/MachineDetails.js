import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MachineTable.css';
import MachineForm from "./MachineForm";
import TechnicalModel from "./Descriptions/TechnicalModel";
import TransmissionModel from "./Descriptions/TransmissionModel";
import EngineModel from "./Descriptions/EngineModel";
import ControlledBridgeModel from "./Descriptions/ControlledBridgeModel";

const MachineDetails = () => {
  const { id } = useParams();
  const [machineData, setMachineData] = useState(null);


  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/machines/${id}/`)
      .then(response => {
         console.log('API Response:', response.data);
         setMachineData(response.data);
      })
      .catch(error => console.log(error));
  }, [id]);

  if (!machineData) {
    return <p>Loading machine data...</p>;
  }

  return (
    <div>
      <div className="detail-view_h2">
        <h2>Подробная информация о машине {machineData.machine_factory_number}</h2>
      </div>
      <table className="machine-table">
        <tbody>
          <tr>
            <td>Technical Model:</td>
            <td>{machineData.technical_model} <i><TechnicalModel/></i></td>

          </tr>
          <tr>
            <td>Engine Factory Number:</td>
            <td>{machineData.engine_factory_number}</td>

          </tr>
          <tr>
            <td>Engine Model:</td>
            <td>{machineData.engine_model} <i><EngineModel/></i></td>
          </tr>
          <tr>
            <td>Transmission Factory Number:</td>
            <td>{machineData.transmission_factory_number} <i><TransmissionModel/></i></td>
          </tr>
          <tr>
            <td>Transmission Model:</td>
            <td>{machineData.transmission_model}</td>
          </tr>
          <tr>
            <td>Driving Bridge Factory Number:</td>
            <td>{machineData.driving_bridge_factory_number}</td>
          </tr>
          <tr>
            <td>Driving Bridge Model:</td>
            <td>{machineData.driving_bridge_model}</td>
          </tr>
          <tr>
            <td>Controlled Bridge Factory Number:</td>
            <td>{machineData.controlled_bridge_factory_number}</td>
          </tr>
          <tr>
            <td>Controlled Bridge Model:</td>
            <td>{machineData.controlled_bridge_model} <i><ControlledBridgeModel/></i></td>
          </tr>
          <tr>
            <td>Delivery Contract:</td>
            <td>{machineData.delivery_contract}</td>
          </tr>
          <tr>
            <td>Shipment Date:</td>
            <td>{machineData.shipment_date}</td>
          </tr>
          <tr>
            <td>Consignee:</td>
            <td>{machineData.consignee}</td>
          </tr>
          <tr>
            <td>Delivery Address:</td>
            <td>{machineData.delivery_address}</td>
          </tr>
          <tr>
            <td>Equipment:</td>
            <td>{machineData.equipment}</td>
          </tr>
          <tr>
            <td>Client:</td>
            <td>{machineData.client}</td>
          </tr>
          <tr>
            <td>Service Company:</td>
            <td>{machineData.service_company}</td>
          </tr>
        </tbody>
      </table>
      {/*<MachineForm machineData={machineData} onSubmit={handleSubmit} />*/}
    </div>
  );
};

export default MachineDetails;