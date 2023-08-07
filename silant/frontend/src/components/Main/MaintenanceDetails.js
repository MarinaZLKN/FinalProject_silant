import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Organization from "./Descriptions/Organization";
import TypeOfMaintenance from "./Descriptions/TypeOfMaintenance";

const MaintenanceDetails = () => {
  const { id } = useParams();
  const [maintenanceData, setMaintenanceData] = useState(null);

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/maintenances/${id}/`)
      .then((response) => {
        console.log('API Response:', response.data);
        setMaintenanceData(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  if (!maintenanceData) {
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
            <td>Date of Maintenance:</td>
            <td>{maintenanceData.date_of_maintenance}</td>
          </tr>
          <tr>
            <td>Operating Time:</td>
            <td>{maintenanceData.operating_time} м/час</td>
          </tr>
          <tr>
            <td>Order Number:</td>
            <td>{maintenanceData.order_number}</td>
          </tr>
          <tr>
            <td>Data of Order:</td>
            <td>{maintenanceData.data_of_order}</td>
          </tr>
          <tr>
            <td>Organization:</td>
            <td>{maintenanceData.organization} <i><Organization/></i> </td>
          </tr>
          <tr>
            <td>Type of Maintenance:</td>
            <td>{maintenanceData.type_of_maintenance} <i><TypeOfMaintenance/></i> </td>
          </tr>
          <tr>
            <td>Machine Factory Number:</td>
            <td>{maintenanceData.machine}</td>
          </tr>


        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceDetails;
