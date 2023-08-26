import React, { useState } from 'react';
import axios from 'axios';
import './MachineForm.css'

const CreateModelInstance = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [modelType, setModelType] = useState('');

  const apiEndpoints = {
    'Technical Model': 'http://127.0.0.1:8000/api/technical_models/',
    'Transmission Model': 'http://127.0.0.1:8000/api/transmission_models/',
    'Engine Model': 'http://127.0.0.1:8000/api/engine_models/',
    'Driving Bridge Model': 'http://127.0.0.1:8000/api/driving_bridge_models/',
    'Controlled Bridge Model': 'http://127.0.0.1:8000/api/controlled_bridge_models/',
    'Type of Maintenance': 'http://127.0.0.1:8000/api/types_of_maintenance/',
    'Recovery Method': 'http://127.0.0.1:8000/api/recovery_methods/',
    'Organization': 'http://127.0.0.1:8000/api/organizations/',
    'Failure Node': 'http://127.0.0.1:8000/api/failure_nodes/',
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
        <h2 className="machine-form_h2">Создать новый справочник:</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label className="form-label">Справочник:</label>
            <select value={modelType} onChange={(e) => setModelType(e.target.value)}>
              <option value="" disabled>Выберите справочник</option>
              {Object.keys(apiEndpoints).map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">Название:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Описание:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" className="search-btn">Создать</button>
        </form>
        </div>
      </div>

  );
};

export default CreateModelInstance;
