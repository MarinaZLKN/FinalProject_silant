import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './MachineTable.css';
import FailureNode from "./Descriptions/FailureNode";
import RecoveryMethod from "./Descriptions/RecoveryMethod";
import {useAuth} from "./Auth/AuthContext";

const ClaimDetails = () => {
  const { id } = useParams();
  const [claimDetails, setClaimDetails] = useState({
      claimData: null,
      failureNodeName: '',
      recoveryMethodName: '',
      serviceCompanyName: '',
      machineName: '',

  });
  const { isAuthenticated } = useAuth();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/claim/${id}/`, { headers: commonHeaders })
      .then((response) => {
          const data = response.data;
          console.log('API Response:', data);

          return Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/failure_nodes/${data.failure_node}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/recovery_methods/${data.recovery_method}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/machines/${data.machine}/`, { headers: commonHeaders }),
                    axios.get(`http://127.0.0.1:8000/api/service_companies/${data.service_company}/`, { headers: commonHeaders }),
                ]).then(([failure, method, machine, serviceCompany,client]) => {
                    setClaimDetails({
                        claimData: data,
                        failureNodeName: failure.data.name,
                        recoveryMethodName: method.data.name,
                        machineName: machine.data.machine_factory_number,
                        serviceCompanyName: serviceCompany.data.name.first_name,
                    });
                });
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!claimDetails.claimData) {
        return <p>Loading claim data...</p>;
    }

  return (
    <div>
      <div className="detail-view_h2">
        <h2>Подробная информация о рекламации</h2>
      </div>
      <table className="machine-table">
        <tbody>
        <tr>
            <td>Machine Factory Number:</td>
            <td>{claimDetails.machineName}</td>
          </tr>
          <tr>
            <td>Date of Failure:</td>
            <td>{claimDetails.claimData.date_of_failure}</td>
          </tr>
          <tr>
            <td>Date of Recovery:</td>
            <td>{claimDetails.claimData.date_of_recovery}</td>
          </tr>
          <tr>
            <td>Operating Time:</td>
            <td>{claimDetails.claimData.operating_time} м/час</td>
          </tr>
          <tr>
            <td>Failure Node:</td>
            <td>{claimDetails.failureNodeName} <i><FailureNode/></i> </td>
          </tr>
          <tr>
            <td>Recovery Method:</td>
            <td>{claimDetails.recoveryMethodName} <i><RecoveryMethod/></i> </td>
          </tr>
        <tr>
            <td>Spare Parts Used:</td>
            <td>{claimDetails.claimData.spare_parts_used}</td>
          </tr>
        <tr>
            <td>Technical Downtime:</td>
            <td>{claimDetails.claimData.technical_downtime} days</td>
          </tr>
          <tr>
            <td>Service Company:</td>
            <td>{claimDetails.serviceCompanyName}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ClaimDetails;
