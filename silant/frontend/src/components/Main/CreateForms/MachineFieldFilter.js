import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MachineFieldFilter = ({ onSelectMachine }) => {
  const [machines, setMachines] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/machines/").then((response) => {
      setMachines(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const selectedMachineId = parseInt(e.target.value);
    const selectedMachine = machines.find((machine) => machine.service_company === selectedMachineId);
    onSelectMachine(selectedMachine);
  };

  return (
    <div className="filter-group">
      <label>Machine:</label>
      <select onChange={handleChange}>
        <option value="">Select Machine</option>
        {machines.map((machine) => (
          <option key={machine.service_company} value={machine.service_company}>
            {machine.service_company}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MachineFieldFilter;
