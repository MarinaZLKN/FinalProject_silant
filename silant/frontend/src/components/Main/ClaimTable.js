import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClaimTable = () => {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/claim/')
      .then(response => setClaims(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1 className="h1">Рекламации</h1>
      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Factory Number</th>
            <th>Failure Node</th>
            <th>Date of Failure</th>
            <th>Operating Time</th>
            <th>Spare Parts Used</th>
            <th>Date of Recovery</th>
            <th>Technical Downtime</th>
            <th>Description of Failure</th>
          </tr>
        </thead>
        <tbody>
          {claims.map(claim => (
            <tr key={claim.id}>
              <td>{claim.machine}</td>
              <td>{claim.failure_node}</td>
              <td>{claim.date_of_failure}</td>
              <td>{claim.operating_time} м/час</td>
              <td>{claim.spare_parts_used}</td>
              <td>{claim.date_of_recovery}</td>
              <td>{claim.technical_downtime}</td>
              <td>{claim.description_of_failure}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimTable;