import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "./Auth/AuthContext";

const MaintenanceFilter = () => {
  const [machineFactoryNumber, setMachineFactoryNumber] = useState("");
  const [selectedTypeOfMaintenance, setSelectedTypeOfMaintenance] = useState("");
  const [selectedOrgCompany, setSelectedOrgCompany] = useState("");
  const [typeOfMaintenanceList, setTypeOfMaintenanceList] = useState([]);
  const [orgCompanyList, setOrgCompanyList] = useState([]);
  const [maintenanceData, setMaintenanceData] = useState([]);
  const [filterdMaintenanceData, setFilteredMaintenanceData] = useState([]);
  const [machines, setMachines] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/types_of_maintenance/", { headers: commonHeaders }).then((response) => {
      setTypeOfMaintenanceList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/organizations/", { headers: commonHeaders }).then((response) => {
      setOrgCompanyList(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/maintenances/", { headers: commonHeaders }).then((response) => {
      setMaintenanceData(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines/", { headers: commonHeaders }).then((response) => {
      setMachines(response.data);
    });
  }, []);



  const handleFilter = () => {
    axios
      .get("http://127.0.0.1:8000/api/maintenances/", {
        headers: commonHeaders,
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
    const machine = machines.find(m => m.id === maintenance.machine);
    const machineFactoryNumberMatch = !machineFactoryNumber || (machine && machine.machine_factory_number === machineFactoryNumber);
    const typeOfMaintenanceMatch = !selectedTypeOfMaintenance || maintenance.type_of_maintenance === parseInt(selectedTypeOfMaintenance);
    const orgCompanyMatch = !selectedOrgCompany || maintenance.organization === parseInt(selectedOrgCompany);

    return machineFactoryNumberMatch && typeOfMaintenanceMatch && orgCompanyMatch;
  });

    const handleReset = () => {
      setMachineFactoryNumber("");
      setSelectedTypeOfMaintenance("");
      setSelectedOrgCompany("");
      setFilteredMaintenanceData([]);

      setFilteredMaintenanceData(maintenanceData);
    };


    const handleRowClick = id => {
    navigate(`/maintenances/${id}`);
  };

    const getModelNameById = (id, models) => {

    const model = models.find(model => model.id === id);

    return model ? model.name : 'None';
  }
  const getMachineFactoryNumberById = (id) => {
    const machine = machines.find(m => m.id === id);
    return machine ? machine.machine_factory_number : 'None';
  }


  return (
    <div>
      <div className="filter-group">
        <label>Зав. № машины:</label>
        <input
          type="text"
          value={machineFactoryNumber}
          onChange={(e) => setMachineFactoryNumber(e.target.value)}
        />
      </div>
      <div className="filter-group">
        <label>Тип обслуживания:</label>
        <select value={selectedTypeOfMaintenance} onChange={(e) => setSelectedTypeOfMaintenance(e.target.value)}>
          <option value="">Выберите тип обслуживания</option>
          {typeOfMaintenanceList.map((maintenanceType) => (
            <option key={maintenanceType.id} value={maintenanceType.id}>
              {maintenanceType.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Организация проводившая ТО</label>
        <select value={selectedOrgCompany} onChange={(e) => setSelectedOrgCompany(e.target.value)}>
          <option value="">Выберите организацию</option>
          {orgCompanyList.map((company) => (
            <option key={company.id} value={company.id}>
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
            <th>Зав. № машины</th>
            <th>Дата заказ-наряда</th>
            <th>Дата проведения ТО</th>
            <th>Наработка</th>
            <th>Номер заказа</th>
            <th>Организация проводившая ТО</th>
            <th>Тип обслуживания</th>
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
                <td>{getMachineFactoryNumberById(maintenance.machine, machines)}</td>
                <td>{maintenance.data_of_order}</td>
                <td>{maintenance.date_of_maintenance}</td>
                <td>{maintenance.operating_time} м/час</td>
                <td>{maintenance.order_number}</td>
                <td>{getModelNameById(maintenance.organization, orgCompanyList )}</td>
                <td>{getModelNameById(maintenance.type_of_maintenance, typeOfMaintenanceList )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaintenanceFilter;


