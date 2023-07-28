import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './MachineTable.css';

const ClaimDetails = () => {
  const { id } = useParams();
  const [claimData, setClaimData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/claim/${id}/`)
      .then((response) => {
        console.log('API Response:', response.data);
        setClaimData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!claimData) {
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
            <td>{claimData.machine}</td>
          </tr>
          <tr>
            <td>Date of Failure:</td>
            <td>{claimData.date_of_failure}</td>
          </tr>
          <tr>
            <td>Date of Recovery:</td>
            <td>{claimData.date_of_recovery}</td>
          </tr>
          <tr>
            <td>Operating Time:</td>
            <td>{claimData.operating_time} м/час</td>
          </tr>
          <tr>
            <td>Failure Node:</td>
            <td>{claimData.failure_node}</td>
          </tr>
          <tr>
            <td>Recovery Method:</td>
            <td>{claimData.recovery_method}</td>
          </tr>
        <tr>
            <td>Spare Parts Used:</td>
            <td>{claimData.spare_parts_used}</td>
          </tr>
        <tr>
            <td>Technical Downtime:</td>
            <td>{claimData.technical_downtime}</td>
          </tr>
          <tr>
            <td>Service Company:</td>
            <td>{claimData.service_company}</td>
          </tr>
          {/* Add more claim details as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimDetails;
