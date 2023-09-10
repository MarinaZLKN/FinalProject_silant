import React, { useState } from 'react';
import axios from 'axios';
import './MachineForm.css'

const CreateModelInstance = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modelType, setModelType] = useState('');

  const apiEndpoints = {
    'Technical model': 'http://127.0.0.1:8000/api/technical_models/',
    'Transmission model': 'http://127.0.0.1:8000/api/transmission_models/',
    'Engine model': 'http://127.0.0.1:8000/api/engine_models/',
    'Driving axle model': 'http://127.0.0.1:8000/api/driving_bridge_models/',
    'Steerable axle model': 'http://127.0.0.1:8000/api/controlled_bridge_models/',
    'Type of maintenance': 'http://127.0.0.1:8000/api/types_of_maintenance/',
    'Recovery method': 'http://127.0.0.1:8000/api/recovery_methods/',
    'Organization': 'http://127.0.0.1:8000/api/organizations/',
    'Failure node': 'http://127.0.0.1:8000/api/failure_nodes/',
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = apiEndpoints[modelType];
    if (!endpoint) {
      alert('Please select a model type.');
      return;
    }

    try {
      const payload = { name, description };
      await axios.post(endpoint, payload);
      setName('');
      setDescription('');
      alert(`Successfully created new ${modelType}`);
    } catch (error) {
      alert(`Error creating ${modelType}`);
    }
  };

  return (
      <div className="form_1">
        <div className="form-container_inst">
        <h2 className="machine-form_h2">Create new catalogue:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Catalogue:</label>
            <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
              <option value="" disabled>Choose catalogue</option>
              {Object.keys(apiEndpoints).map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Description:</label>
            <textarea
              className="text_area"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="search-btn">Create</button>
        </form>
        </div>
      </div>

  );
};

export default CreateModelInstance;
