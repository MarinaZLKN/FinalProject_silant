import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import './MachineTable.css';
import {useAuth} from "./Auth/AuthContext";


const ClaimDetails = () => {
  const { id } = useParams();
  const [claimDetails, setClaimDetails] = useState({
      claimData: null,
      failureNodeName: '',
      failureNodeDescription:'',
      recoveryMethodName: '',
      recoveryMethodDescription:'',
      serviceCompanyName: '',
      machineName: '',

  });

  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
      axios
          .get(`http://127.0.0.1:8000/api/claim/${id}/`, {headers: commonHeaders})
          .then((response) => {
              const data = response.data;
              setClaimDetails({
                  claimData: data,
                  failureNodeName: '',
                  failureNodeDescription: '',
                  recoveryMethodName: '',
                  recoveryMethodDescription: '',
                  serviceCompanyName: '',
                  machineName: '',

              });
              console.log('API Response:', data);

              return Promise.all([
                  axios.get(`http://127.0.0.1:8000/api/failure_nodes/${data.failure_node}/`, {headers: commonHeaders}),
                  axios.get(`http://127.0.0.1:8000/api/recovery_methods/${data.recovery_method}/`, {headers: commonHeaders}),
                  axios.get(`http://127.0.0.1:8000/api/machines/${data.machine}/`, {headers: commonHeaders}),
                  axios.get(`http://127.0.0.1:8000/api/service_companies/${data.service_company}/`, {headers: commonHeaders}),
              ]);
          })
        .then((responses) => {
                  const [failureNodeData, recoveryMethodData, machineData, serviceCompanyData] = responses.map(res => res.data);
                  setClaimDetails(prevState => ({
                      ...prevState,
                      failureNodeName: failureNodeData.name,
                      failureNodeDescription: failureNodeData.description,
                      recoveryMethodName: recoveryMethodData.name,
                      recoveryMethodDescription: recoveryMethodData.description,
                      machineName: machineData.machine_factory_number,
                      serviceCompanyName: serviceCompanyData.name.first_name,
                  }));
                  setIsLoading(false);
              })
                  .catch((error) => {
                      console.log(error);
                      setIsLoading(false);
                  });
          }, [id]);
    const handleDelete = () => {
        axios.delete(`http://127.0.0.1:8000/api/claim/${id}/`, { headers: commonHeaders })
          .then(() => {
            navigate("/claim");
          })
          .catch(error => {
            console.log(error);
          });
      };

    const handleEdit = () => {
        navigate("/claims/edit/:id", {
          state: {
            claim: claimDetails.claimData,
            isEditing: true
          }
        });
      }

  if (isLoading) {
          return <p>Loading claim data...</p>;
      }

  return (
    <div>
      <div className="detail-view_h2">
        <h2>Detailed information about the complaint</h2>
      </div>
      <table className="machine-table">
        <tbody>
        <tr>
            <td> <b>Machine serial number:</b> </td>
            <td> <b>{claimDetails.machineName}</b> </td>
          </tr>
          <tr>
            <td><b>Date of breakdown:</b></td>
            <td>{claimDetails.claimData.date_of_failure}</td>
          </tr>
          <tr>
            <td><b>Date of recovery:</b></td>
            <td>{claimDetails.claimData.date_of_recovery}</td>
          </tr>
          <tr>
            <td><b>Operating time:</b></td>
            <td>{claimDetails.claimData.operating_time} min/h</td>
          </tr>
          <tr>
            <td><b>Failure node:</b></td>
            <td>{claimDetails.failureNodeName} <b>Description:</b> <i>{claimDetails.failureNodeDescription}</i> </td>
          </tr>
          <tr>
            <td><b>Recovery method:</b></td>
            <td>{claimDetails.recoveryMethodName} <b>Description:</b> <i>{claimDetails.recoveryMethodDescription}</i>  </td>
          </tr>
        <tr>
            <td><b>Spare parts used:</b></td>
            <td>{claimDetails.claimData.spare_parts_used}</td>
          </tr>
        <tr>
            <td><b>Description of failure:</b></td>
            <td>{claimDetails.claimData.description_of_failure}</td>
          </tr>
        <tr>
            <td><b>Technical downtime:</b></td>
            <td>{claimDetails.claimData.technical_downtime} days</td>
          </tr>
          <tr>
            <td><b>Service company:</b></td>
            <td>{claimDetails.serviceCompanyName}</td>
          </tr>
        </tbody>
      </table>
        <div className="delete_btn">
            {isAuthenticated && user && (user.role === 'Менеджер' || user.role === 'Сервис') && (
                <button className="search-btn" onClick={handleDelete}>
                    Delete
                </button>
                )}
            <button className="search-btn" onClick={handleEdit}>
                Update
            </button>
        </div>

    </div>
  );
};

export default ClaimDetails;
