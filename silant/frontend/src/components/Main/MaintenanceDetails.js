import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Organization from "./Descriptions/Organization";
import TypeOfMaintenance from "./Descriptions/TypeOfMaintenance";

const MaintenanceDetails = () => {
  const { id } = useParams();
  const [maintenanceDetails, setMaintenanceDetails] = useState({
    maintenanceData: null,
    organizationName: '',
    typeOfMaintenanceName: '',
    machineName: '',
  });

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/maintenances/${id}/`)
      .then((response) => {
        const data = response.data;
        console.log('API Response:',data);

        return Promise.all([
                    axios.get(`http://127.0.0.1:8000/api/organizations/${data.organization}/`),
                    axios.get(`http://127.0.0.1:8000/api/types_of_maintenance/${data.type_of_maintenance}/`),
                    axios.get(`http://127.0.0.1:8000/api/machines/${data.machine}/`),
                ]).then(([org, type, machine,]) => {
                    setMaintenanceDetails({
                        maintenanceData: data,
                        organizationName: org.data.name,
                        typeOfMaintenanceName: type.data.name,
                        machineName: machine.data.machine_factory_number,
                    });
                });
            })
            .catch(error => console.log(error));
    }, [id]);

    if (!maintenanceDetails.maintenanceData) {
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
            <td>{maintenanceDetails.organizationName} <i><Organization/></i> </td>
          </tr>
          <tr>
            <td>Type of Maintenance:</td>
            <td>{maintenanceDetails.typeOfMaintenanceName} <i><TypeOfMaintenance/></i> </td>
          </tr>
          <tr>
            <td>Machine Factory Number:</td>
            <td>{maintenanceDetails.machineName}</td>
          </tr>


        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceDetails;
