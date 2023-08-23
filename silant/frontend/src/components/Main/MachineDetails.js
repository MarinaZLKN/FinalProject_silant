import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './MachineTable.css';
import TechnicalModel from "./Descriptions/TechnicalModel";
import TransmissionModel from "./Descriptions/TransmissionModel";
import EngineModel from "./Descriptions/EngineModel";
import ControlledBridgeModel from "./Descriptions/ControlledBridgeModel";
import DrivingBridgeModel from "./Descriptions/DrivingBridgeModel";
import {useAuth} from "./Auth/AuthContext";

const MachineDetails = () => {
    const { id } = useParams();

    const [machineDetails, setMachineDetails] = useState({
        machineData: null,
        technicalModelName: '',
        engineModelName: '',
        transmissionModelName: '',
        drivingBridgeModelName: '',
        controlledBridgeModelName: '',
        serviceCompanyName: '',
        clientName: '',
    });
    const { isAuthenticated } = useAuth();

    const commonHeaders = isAuthenticated ? {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
    } : {};

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/machines/${id}/`, { headers: commonHeaders })
            .then(response => {
                const data = response.data;
                console.log('data: ', data);

                return Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/technical_models/${data.technical_model}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/engine_models/${data.engine_model}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/transmission_models/${data.transmission_model}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/driving_bridge_models/${data.driving_bridge_model}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/controlled_bridge_models/${data.controlled_bridge_model}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/service_companies/${data.service_company}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/clients/${data.client}/`, { headers: commonHeaders }),
                ]).then(([technical, engine, transmission, drivingBridge, controlledBridge,serviceCompany,client]) => {
                    setMachineDetails({
                        machineData: data,
                        technicalModelName: technical.data.name,
                        engineModelName: engine.data.name,
                        transmissionModelName: transmission.data.name,
                        drivingBridgeModelName: drivingBridge.data.name,
                        controlledBridgeModelName: controlledBridge.data.name,
                        serviceCompanyName: serviceCompany.data.name.first_name,
                        clientName: client.data.name.first_name,
                    });
                });
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!machineDetails.machineData) {
        return <p>Loading machine data...</p>;
    }

    return (
        <div>
            <div className="detail-view_h2">
                <h2>Подробная информация о машине {machineDetails.machineData.machine_factory_number}</h2>
            </div>
            <table className="machine-table">
                <tbody>
                    <tr>
                        <td>Technical Model:</td>
                        <td>{machineDetails.technicalModelName} <i><TechnicalModel/></i></td>
                    </tr>
                    <tr>
                        <td>Engine Factory Number:</td>
                        <td>{machineDetails.machineData.engine_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Engine Model:</td>
                        <td>{machineDetails.engineModelName} <i><EngineModel/></i></td>
                    </tr>
                    <tr>
                        <td>Transmission Factory Number:</td>
                        <td>{machineDetails.machineData.transmission_factory_number} </td>
                    </tr>
                    <tr>
                        <td>Transmission Model:</td>
                        <td>{machineDetails.transmissionModelName} <i><TransmissionModel/></i></td>
                    </tr>
                    <tr>
                        <td>Driving Bridge Factory Number:</td>
                        <td>{machineDetails.machineData.driving_bridge_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Driving Bridge Model:</td>
                        <td>{machineDetails.drivingBridgeModelName} <i><DrivingBridgeModel/></i></td>
                    </tr>
                    <tr>
                        <td>Controlled Bridge Factory Number:</td>
                        <td>{machineDetails.machineData.controlled_bridge_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Controlled Bridge Model:</td>
                        <td>{machineDetails.controlledBridgeModelName} <i><ControlledBridgeModel/></i></td>
                    </tr>
                      <tr>
                        <td>Delivery Contract:</td>
                        <td>{machineDetails.machineData.delivery_contract}</td>
                      </tr>
                      <tr>
                        <td>Shipment Date:</td>
                        <td>{machineDetails.machineData.shipment_date}</td>
                      </tr>
                      <tr>
                        <td>Consignee:</td>
                        <td>{machineDetails.machineData.consignee}</td>
                      </tr>
                      <tr>
                        <td>Delivery Address:</td>
                        <td>{machineDetails.machineData.delivery_address}</td>
                      </tr>
                      <tr>
                        <td>Equipment:</td>
                        <td>{machineDetails.machineData.equipment}</td>
                      </tr>
                    <tr>
                        <td>Client:</td>
                        <td>{machineDetails.clientName} </td>
                    </tr>
                    <tr>
                        <td>Service Company:</td>
                        <td>{machineDetails.serviceCompanyName} </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default MachineDetails;
