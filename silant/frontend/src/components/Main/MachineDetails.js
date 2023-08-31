import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import './MachineTable.css';
import {useAuth} from "./Auth/AuthContext";

const MachineDetails = () => {
    const { id } = useParams();

    const [machineDetails, setMachineDetails] = useState({
        machineData: null,
        technicalModelName: '',
        technicalDescription: '',
        engineModelName: '',
        engineDescription: '',
        transmissionModelName: '',
        transmissionDescription: '',
        drivingBridgeModelName: '',
        drivingDescription: '',
        controlledBridgeModelName: '',
        controlledDescription: '',
        serviceCompanyName: '',
        clientName: '',
    });
    const { isAuthenticated } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const commonHeaders = isAuthenticated ? {
        'Authorization': `Token ${localStorage.getItem('authToken')}`
    } : {};

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/machines/${id}/`, { headers: commonHeaders })
            .then((response) => {
                const data = response.data;
                setMachineDetails({
                    machineData: data,
                    technicalModelName: '',
                    technicalDescription: '',
                    engineModelName: '',
                    engineDescription: '',
                    transmissionModelName: '',
                    transmissionDescription: '',
                    drivingBridgeModelName: '',
                    drivingDescription: '',
                    controlledBridgeModelName: '',
                    controlledDescription: '',
                    serviceCompanyName: '',
                    clientName: '',
                });
                console.log('data: ', data);

                return Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/technical_models/${data.technical_model}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/engine_models/${data.engine_model}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/transmission_models/${data.transmission_model}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/driving_bridge_models/${data.driving_bridge_model}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/controlled_bridge_models/${data.controlled_bridge_model}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/service_companies/${data.service_company}/`, {headers: commonHeaders}),
                    axios.get(`http://127.0.0.1:8000/api/clients/${data.client}/`, {headers: commonHeaders}),
                ]).then((responses) => {
                    const [technicalData, engineData, transmissionData, contrData, drivData, serviceData, cilentData] = responses.map(res => res.data);
                    setMachineDetails(prevState => ({
                        ...prevState,
                        technicalModelName: technicalData.name,
                        technicalDescription: technicalData.description,
                        engineModelName: engineData.name,
                        engineDescription: engineData.description,
                        transmissionModelName: transmissionData.name,
                        transmissionDescription: transmissionData.description,
                        drivingBridgeModelName: drivData.name,
                        drivingDescription: drivData.description,
                        controlledBridgeModelName: contrData.name,
                        controlledDescription: contrData.description,
                        serviceCompanyName: serviceData.name.first_name,
                        clientName: cilentData.name.first_name,
                    }));
                    setIsLoading(false);
                })
                    .catch((error) => console.log(error));
                    setIsLoading(false);
            });
    }, [id]);

    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/machines/${id}/`, { headers: commonHeaders })
          .then(() => {
            navigate("/machines");
          })
          .catch(error => {
            console.log(error);
          });
      };

    const handleEdit = () => {
        navigate("/machines/edit/:id", {
          state: {
            machine: machineDetails.machineData,
            isEditing: true
          }
        });
      }

    if (isLoading) {
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
                        <td>{machineDetails.technicalModelName}  <b>Описание:</b> <i>{machineDetails.technicalDescription}</i> </td>
                    </tr>
                    <tr>
                        <td>Engine Factory Number:</td>
                        <td>{machineDetails.machineData.engine_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Engine Model:</td>
                        <td>{machineDetails.engineModelName}  <b>Описание:</b> <i>{machineDetails.engineDescription}</i></td>
                    </tr>
                    <tr>
                        <td>Transmission Factory Number:</td>
                        <td>{machineDetails.machineData.transmission_factory_number} </td>
                    </tr>
                    <tr>
                        <td>Transmission Model:</td>
                        <td>{machineDetails.transmissionModelName} <b>Описание:</b> <i>{machineDetails.transmissionDescription}</i></td>
                    </tr>
                    <tr>
                        <td>Driving Bridge Factory Number:</td>
                        <td>{machineDetails.machineData.driving_bridge_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Driving Bridge Model:</td>
                        <td>{machineDetails.drivingBridgeModelName}  <b>Описание:</b> <i>{machineDetails.drivingDescription}</i></td>
                    </tr>
                    <tr>
                        <td>Controlled Bridge Factory Number:</td>
                        <td>{machineDetails.machineData.controlled_bridge_factory_number}</td>
                    </tr>
                    <tr>
                        <td>Controlled Bridge Model:</td>
                        <td>{machineDetails.controlledBridgeModelName}  <b>Описание:</b> <i>{machineDetails.controlledDescription}</i></td>
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
            <div className="delete_btn">
            <button className="search-btn" onClick={handleDelete}>
                Удалить
            </button>
            <button className="search-btn" onClick={handleEdit}>
              Изменить
            </button>
        </div>
        </div>
    );
};

export default MachineDetails;
