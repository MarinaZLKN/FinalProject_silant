import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {useAuth} from "./Auth/AuthContext";

const MaintenanceDetails = () => {
  const { id } = useParams();
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    maintenanceData: null,
    organizationName: '',
    organizationDescription: '',
    typeOfMaintenanceName: '',
    typeOfMaintenanceDescription: '',
    machineName: ''
  });
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/maintenances/${id}`, { headers: commonHeaders })
      .then((response) => {
        const data = response.data;
        setMaintenanceDetails({
          maintenanceData: data,
          organizationName: '',
          organizationDescription: '',
          typeOfMaintenanceName: '',
          machineName: ''
        });

        return Promise.all([
          axios.get(`http://127.0.0.1:8000/api/organizations/${data.organization}`, { headers: commonHeaders }),
          axios.get(`http://127.0.0.1:8000/api/types_of_maintenance/${data.type_of_maintenance}`, { headers: commonHeaders }),
          axios.get(`http://127.0.0.1:8000/api/machines/${data.machine}`, { headers: commonHeaders })
        ]);
      })
      .then((responses) => {
        const [organizationData, typeOfMaintenanceData, machineData] = responses.map(res => res.data);
        setMaintenanceDetails(prevState => ({
          ...prevState,
          organizationName: organizationData.name,
          organizationDescription: organizationData.description,
          typeOfMaintenanceName: typeOfMaintenanceData.name,
          typeOfMaintenanceDescription: typeOfMaintenanceData.description,
          machineName: machineData.machine_factory_number
        }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Loading maintenance data...</p>;
  }

  return (
    <div>
      <div className="detail-view_h2">
        <h2>Техническое обслуживание</h2>
      </div>
      <table className="machine-table">
        <tbody>
          <tr>
            <td>Machine Factory Number:</td>
            <td> <b>{maintenanceDetails.machineName}</b> </td>
          </tr>
          <tr>
            <td>Data of Order:</td>
            <td>{maintenanceDetails.maintenanceData.data_of_order}</td>
          </tr>
          <tr>
            <td>Date of Maintenance:</td>
            <td>{maintenanceDetails.maintenanceData.date_of_maintenance}</td>
          </tr>
          <tr>
            <td>Operating Time:</td>
            <td>{maintenanceDetails.maintenanceData.operating_time} м/час</td>
          </tr>
          <tr>
            <td>Order Number:</td>
            <td>{maintenanceDetails.maintenanceData.order_number}</td>
          </tr>
          <tr>
            <td>Organization:</td>
            <td>{maintenanceDetails.organizationName}
                <b> Описание:</b> <i>{maintenanceDetails.organizationDescription}</i> </td>
          </tr>
          <tr>
            <td>Type of Maintenance:</td>
            <td>{maintenanceDetails.typeOfMaintenanceName} <b> Описание:</b>  <i>{maintenanceDetails.typeOfMaintenanceDescription}</i> </td>
          </tr>

        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceDetails;

