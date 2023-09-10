import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "./Auth/AuthContext";

const ClaimFilter = () => {
  const [selectedServiceCompany, setSelectedServiceCompany] = useState("");
  const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState("");
  const [selectedFailureNode, setSelectedFailureNode] = useState("");
  const [serviceCompanies, setServiceCompanies] = useState([]);
  const [recoveryMethods, setRecoveryMethods] = useState([]);
  const [failureNodes, setFailureNodes] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [claims, setClaims] = useState([]);
  const [machines, setMachines] = useState([]);

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const commonHeaders = isAuthenticated ? {
    'Authorization': `Token ${localStorage.getItem('authToken')}`
  } : {};

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/service_companies/", { headers: commonHeaders }).then((response) => {
      setServiceCompanies(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/recovery_methods/", { headers: commonHeaders }).then((response) => {
      setRecoveryMethods(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/failure_nodes/", { headers: commonHeaders }).then((response) => {
      setFailureNodes(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/claim/", { headers: commonHeaders }).then((response) => {
      setClaims(response.data);
    });
  }, []);

  useEffect(() => {

    const filteredData = claims.filter((claim) => {
      const serviceCompanyMatch = !selectedServiceCompany || claim.service_company === parseInt(selectedServiceCompany);
      const recoveryMethodMatch = !selectedRecoveryMethod || claim.recovery_method === parseInt(selectedRecoveryMethod);
      const failureNodeMatch = !selectedFailureNode || claim.failure_node === parseInt(selectedFailureNode);

      return serviceCompanyMatch && recoveryMethodMatch && failureNodeMatch;
    });

    setFilteredClaims(filteredData);
  }, [selectedServiceCompany, selectedRecoveryMethod, selectedFailureNode, claims]);

  const handleReset = () => {
    setSelectedServiceCompany("");
    setSelectedRecoveryMethod("");
    setSelectedFailureNode("");

    setFilteredClaims(claims);
  };


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines/", { headers: commonHeaders }).then((response) => {
      setMachines(response.data);
    });
  }, []);

  const handleRowClick = id => {
    navigate(`/claims/${id}`);
  };

  // Functions to display the proper names in the tables
  const getModelNameById = (id, models) => {

    const model = models.find(model => model.id === id);

    return model ? model.name : 'None';
  }

  const getModelFirstNameById = (id, models) => {

    const model = models.find(model => model.id === id);

    return model ? model.name.first_name : 'None';
  }
  const getMachineFactoryNumberById = (id) => {
    const machine = machines.find(m => m.id === id);
    return machine ? machine.machine_factory_number : 'None';
  }

  return (
    <div>
      <div className="filter-group">
        <label>Service company:</label>
        <select value={selectedServiceCompany} onChange={(e) => setSelectedServiceCompany(e.target.value)}>
          <option value="">Choose service company</option>
          {serviceCompanies.map((company) => (
            <option key={company.name.id} value={company.id}>
              {company.name.first_name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Recovery method:</label>
        <select value={selectedRecoveryMethod}  onChange={(e) => setSelectedRecoveryMethod(e.target.value)}>
          <option value="">Choose recovery method</option>
          {recoveryMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Failure node:</label>
        <select value={selectedFailureNode} onChange={(e) => setSelectedFailureNode(e.target.value)}>
          <option value="">Choose failure node</option>
          {failureNodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="search-btn" onClick={handleReset}>Reset</button>
      <Link to="/create-claim">
          <button type="button" className="search-btn">Add</button>
        </Link>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine serial number</th>
            <th>Date of breakdown</th>
            <th>Date of recovery</th>
            <th>Operating time</th>
            <th>Technical downtime</th>
            <th>Failure node</th>
            <th>Recovery method</th>
            <th>Service company</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim) => (
              <tr
              key={claim.id}
              onClick={() => handleRowClick(claim.id)}
              className="machine-row"
            >
            {/*<tr key={claim.id}>*/}
                <td>{getMachineFactoryNumberById(claim.machine, machines)}</td>
                <td>{claim.date_of_failure}</td>
                <td>{claim.date_of_recovery}</td>
                <td>{claim.operating_time} м/час</td>
                <td>{claim.technical_downtime} дней </td>
                <td>{getModelNameById(claim.failure_node, failureNodes)}</td>
                <td>{getModelNameById(claim.recovery_method, recoveryMethods)}</td>
                <td>{getModelFirstNameById(claim.service_company, serviceCompanies )}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimFilter;