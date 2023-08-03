import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";

const MaintenanceFilter = () => {
  const [machineFactoryNumber, setMachineFactoryNumber] = useState("");
  const [selectedTypeOfMaintenance, setSelectedTypeOfMaintenance] = useState("");
  const [selectedOrgCompany, setSelectedOrgCompany] = useState("");
  const [typeOfMaintenanceList, setTypeOfMaintenanceList] = useState([]);
  const [orgCompanyList, setOrgCompanyList] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [filterdMaintenanceData, setFilteredMaintenanceData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/types_of_maintenance/").then((response) => {
      setTypeOfMaintenanceList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/organizations/").then((response) => {
      setOrgCompanyList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/maintenances/").then((response) => {
      setMaintenanceData(response.data);
    });
  }, []);



  const handleFilter = () => {
    axios
      .get("http://127.0.0.1:8000/api/maintenances/", {
        params: {
          machine__machine_factory_number: machineFactoryNumber,
          type_of_maintenance__name: selectedTypeOfMaintenance,
          organization__name: selectedOrgCompany,
        },
      })
      .then((response) => {
        console.log(response.data);
        setMaintenanceData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


    const filteredMaintenanceData = maintenanceData.filter((maintenance) => {
    const machineFactoryNumberMatch = !machineFactoryNumber || maintenance.machine.includes(machineFactoryNumber);
    const typeOfMaintenanceMatch = !selectedTypeOfMaintenance || maintenance.type_of_maintenance === selectedTypeOfMaintenance;
    const orgCompanyMatch = !selectedOrgCompany || maintenance.organization === selectedOrgCompany;

    return machineFactoryNumberMatch && typeOfMaintenanceMatch && orgCompanyMatch;
  });

    const handleReset = () => {
      setMachineFactoryNumber("");
      setSelectedTypeOfMaintenance("");
      setSelectedOrgCompany("");
      setFilteredMaintenanceData([]);
    };


    const handleRowClick = id => {
    navigate(`/maintenances/${id}`);
  };



  return (
    <div>
      <div className="filter-group">
        <label>Machine Factory Number:</label>
        <input
          type="text"
          value={machineFactoryNumber}
          onChange={(e) => setMachineFactoryNumber(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Type of Maintenance:</label>
        <select onChange={(e) => setSelectedTypeOfMaintenance(e.target.value)}>
          <option value="">Select Type of Maintenance</option>
          {typeOfMaintenanceList.map((maintenanceType) => (
            <option key={maintenanceType.id} value={maintenanceType.name}>
              {maintenanceType.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Service Company:</label>
        <select onChange={(e) => setSelectedOrgCompany(e.target.value)}>
          <option value="">Select Organization</option>
          {orgCompanyList.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      {/*<button type="button" className="search-btn" onClick={handleFilter}>Показать</button>*/}
      <button type="button" className="search-btn" onClick={handleReset}>Сбросить</button>
      <Link to="/create-main">
          <button type="button" className="search-btn">Добавить</button>
        </Link>


      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine</th>
            <th>Data of Order</th>
            <th>Date of Maintenance</th>
            <th>Operating Time</th>
            <th>Order Number</th>
            <th>Organization</th>
            <th>Type of Maintenance</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaintenanceData.map((maintenance) => (
              <tr
              key={maintenance.id}
              onClick={() => handleRowClick(maintenance.id)}
              className="machine-row"
            >
            {/*// <tr key={maintenance.id}>*/}
                <td>{maintenance.machine}</td>
                <td>{maintenance.data_of_order}</td>
                <td>{maintenance.date_of_maintenance}</td>
                <td>{maintenance.operating_time} м/час</td>
                <td>{maintenance.order_number}</td>
                <td>{maintenance.organization}</td>
                <td>{maintenance.type_of_maintenance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceFilter;


