import React, { useState, useEffect } from "react";
import axios from "axios";
import './MachineTable.css';
import '../Search/Search.css';

const ClaimFilter = () => {
  const [selectedServiceCompany, setSelectedServiceCompany] = useState("");
  const [selectedRecoveryMethod, setSelectedRecoveryMethod] = useState("");
  const [selectedFailureNode, setSelectedFailureNode] = useState("");
  const [serviceCompanies, setServiceCompanies] = useState([]);
  const [recoveryMethods, setRecoveryMethods] = useState([]);
  const [failureNodes, setFailureNodes] = useState([]);
  const [filteredClaims, setFilteredClaims] = useState([]);
  const [claims, setClaims] = useState([]); // Store all claim data

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
      setClaims(response.data); // Store all claim data
    });
  }, []);

  useEffect(() => {
    // Apply filters whenever selected criteria change
    const filteredData = claims.filter((claim) => {
      const serviceCompanyMatch = !selectedServiceCompany || claim.service_company === selectedServiceCompany;
      const recoveryMethodMatch = !selectedRecoveryMethod || claim.recovery_method === selectedRecoveryMethod;
      const failureNodeMatch = !selectedFailureNode || claim.failure_node === selectedFailureNode;

      return serviceCompanyMatch && recoveryMethodMatch && failureNodeMatch;
    });

    setFilteredClaims(filteredData);
  }, [selectedServiceCompany, selectedRecoveryMethod, selectedFailureNode, claims]);

  const handleReset = () => {
    setSelectedServiceCompany("");
    setSelectedRecoveryMethod("");
    setSelectedFailureNode("");
  };

  return (
    <div>
      <div className="filter-group">
        <label>Service Company:</label>
        <select onChange={(e) => setSelectedServiceCompany(e.target.value)}>
          <option value="">Select Service Company</option>
          {serviceCompanies.map((company) => (
            <option key={company.id} value={company.name}>
              {company.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Recovery Method:</label>
        <select onChange={(e) => setSelectedRecoveryMethod(e.target.value)}>
          <option value="">Select Recovery Method</option>
          {recoveryMethods.map((method) => (
            <option key={method.id} value={method.name}>
              {method.name}
            </option>
          ))}
        </select>
      </div>
      <div className="filter-group">
        <label>Failure Node:</label>
        <select onChange={(e) => setSelectedFailureNode(e.target.value)}>
          <option value="">Select Failure Node</option>
          {failureNodes.map((node) => (
            <option key={node.id} value={node.name}>
              {node.name}
            </option>
          ))}
        </select>
      </div>
      <button type="button" className="search-btn" onClick={handleReset}>Сбросить</button>

      <table className="machine-table">
        <thead>
          <tr>
            <th>Date of Failure</th>
            <th>Operating Time</th>
            <th>Failure Node</th>
            <th>Recovery Method</th>
            <th>Machine Factory Number</th>
            <th>Service Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredClaims.map((claim) => (
            <tr key={claim.id}>
              <td>{claim.date_of_failure}</td>
              <td>{claim.operating_time} м/час</td>
              <td>{claim.failure_node}</td>
              <td>{claim.recovery_method}</td>
              <td>{claim.machine}</td>
              <td>{claim.service_company}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClaimFilter;


