import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
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
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

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

  const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/maintenances/${id}/`, { headers: commonHeaders })
          .then(() => {
            navigate("/maintenance");
          })
          .catch(error => {
            console.log(error);
          });
      };

  const handleEdit = () => {
        navigate("/main/edit/:id", {
          state: {
            maintenance: maintenanceDetails.maintenanceData,
            isEditing: true
          }
        });
      }

  if (isLoading) {
    return <p>Loading maintenance data...</p>;
  }

  return (
    <div>
      <div className="detail-view_h2">
        <h2>Maintenance</h2>
      </div>
      <table className="machine-table">
        <tbody>
          <tr>
            <td><b>Machine serial number:</b></td>
            <td> <b>{maintenanceDetails.machineName}</b> </td>
          </tr>
          <tr>
            <td><b>Date of order:</b></td>
            <td>{maintenanceDetails.maintenanceData.data_of_order}</td>
          </tr>
          <tr>
            <td> <b>Date of maintenance</b></td>
            <td>{maintenanceDetails.maintenanceData.date_of_maintenance}</td>
          </tr>
          <tr>
            <td><b>Operating time:</b></td>
            <td>{maintenanceDetails.maintenanceData.operating_time} min/h </td>
          </tr>
          <tr>
            <td><b>Order number:</b></td>
            <td>{maintenanceDetails.maintenanceData.order_number}</td>
          </tr>
          <tr>
            <td><b>Organization:</b></td>
            <td>{maintenanceDetails.organizationName}
                <b> Description:</b> <i>{maintenanceDetails.organizationDescription}</i> </td>
          </tr>
          <tr>
            <td><b>Type of maintenance:</b></td>
            <td>{maintenanceDetails.typeOfMaintenanceName} <b> Description:</b>  <i>{maintenanceDetails.typeOfMaintenanceDescription}</i> </td>
          </tr>

        </tbody>
      </table>
      <div className="delete_btn">
            <button className="search-btn" onClick={handleDelete}>
                Delete
            </button>

          <button className="search-btn" onClick={handleEdit}>
                Update
            </button>
        </div>
    </div>
  );
};

export default MaintenanceDetails;

