import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';

const MaintenanceFilter = () => {
  const [machineFactoryNumber, setMachineFactoryNumber] = useState("");
  const [selectedTypeOfMaintenance, setSelectedTypeOfMaintenance] = useState("");
  const [selectedServiceCompany, setSelectedServiceCompany] = useState("");
  const [typeOfMaintenanceList, setTypeOfMaintenanceList] = useState([]);
  const [serviceCompanyList, setServiceCompanyList] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [filteredMaintenanceData, setFilteredMaintenanceData] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/types_of_maintenance/").then((response) => {
      setTypeOfMaintenanceList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/service_companies/").then((response) => {
      setServiceCompanyList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/maintenances/").then((response) => {
      setMaintenanceData(response.data);
      setFilteredMaintenanceData(response.data);
    });
  }, []);

  const handleFilter = () => {

    const filteredData = maintenanceData.filter((maintenance) => {
      const isMachineMatched =
        machineFactoryNumber === "" ||
        maintenance.machine.machine_factory_number.includes(machineFactoryNumber);

      const isTypeMatched =
        selectedTypeOfMaintenance === "" ||
        maintenance.type_of_maintenance.name === selectedTypeOfMaintenance;

      const isServiceCompanyMatched =
        selectedServiceCompany === "" || maintenance.service_company.name === selectedServiceCompany;

      return isMachineMatched && isTypeMatched && isServiceCompanyMatched;
    });

    setFilteredMaintenanceData(filteredData);
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
        <select onChange={(e) => setSelectedServiceCompany(e.target.value)}>
          <option value="">Select Service Company</option>
          {serviceCompanyList.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="search-btn" onClick={handleFilter}>Показать</button>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Date of Maintenance</th>
            <th>Operating Time</th>
            <th>Order Number</th>
            <th>Data of Order</th>
            <th>Organization</th>
            <th>Type of Maintenance</th>
            <th>Machine Factory Number</th>
            <th>Service Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredMaintenanceData.map((maintenance) => (
            <tr key={maintenance.id}>
              <td>{maintenance.date_of_maintenance}</td>
              <td>{maintenance.operating_time}</td>
              <td>{maintenance.order_number}</td>
              <td>{maintenance.data_of_order}</td>
              <td>{maintenance.organization}</td>
              <td>{maintenance.type_of_maintenance}</td>
              <td>{maintenance.machine.machine_factory_number}</td>
              <td>{maintenance.service_company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceFilter;

