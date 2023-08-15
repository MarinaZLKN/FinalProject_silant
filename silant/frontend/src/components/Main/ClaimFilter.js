import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';
import {Link, useNavigate} from "react-router-dom";

const ClaimFilter = () => {
  const [selectedServiceCompany, setSelectedServiceCompany] = useState("");
  const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState("");
  const [selectedFailureNode, setSelectedFailureNode] = useState("");
  const [serviceCompanies, setServiceCompanies] = useState([]);
  const [recoveryMethods, setRecoveryMethods] = useState([]);
  const [failureNodes, setFailureNodes] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [claims, setClaims] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/service_companies/").then((response) => {
      setServiceCompanies(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/recovery_methods/").then((response) => {
      setRecoveryMethods(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/failure_nodes/").then((response) => {
      setFailureNodes(response.data);
    });

    axios.get("http://127.0.0.1:8000/api/claim/").then((response) => {
      setClaims(response.data);
    });
  }, []);

  console.log('Service Companies', serviceCompanies)

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

  const handleRowClick = id => {
    navigate(`/claims/${id}`);
  };

  return (
    <div>
      <div className="filter-group">
        <label>Service Company:</label>
        <select value={selectedServiceCompany} onChange={(e) => setSelectedServiceCompany(e.target.value)}>
          <option value="">Select Service Company</option>
          {serviceCompanies.map((company) => (
            <option key={company.name.id} value={company.id}>
              {company.name.first_name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Recovery Method:</label>
        <select value={selectedRecoveryMethod}  onChange={(e) => setSelectedRecoveryMethod(e.target.value)}>
          <option value="">Select Recovery Method</option>
          {recoveryMethods.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Failure Node:</label>
        <select value={selectedFailureNode} onChange={(e) => setSelectedFailureNode(e.target.value)}>
          <option value="">Select Failure Node</option>
          {failureNodes.map((node) => (
            <option key={node.id} value={node.id}>
              {node.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="search-btn" onClick={handleReset}>Сбросить</button>
      <Link to="/create-claim">
          <button type="button" className="search-btn">Добавить</button>
        </Link>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Machine Factory Number</th>
            <th>Date of Failure</th>
            <th>Date of Recovery</th>
            <th>Operating Time</th>
            <th>Technical Downtime</th>
            <th>Failure Node</th>
            <th>Recovery Method</th>
            <th>Service Company</th>
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
                <td>{claim.machine}</td>
                <td>{claim.date_of_failure}</td>
                <td>{claim.date_of_recovery}</td>
                <td>{claim.operating_time} м/час</td>
                <td>{claim.technical_downtime}</td>
                <td>{claim.failure_node}</td>
                <td>{claim.recovery_method}</td>
                <td>{claim.service_company.first_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimFilter;