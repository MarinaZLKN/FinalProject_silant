import React, { useState } from 'react';
import axios from 'axios';

const AddClientForm = () => {
  const [newClient, setNewClient] = useState({
    user: '', // Provide the necessary value for 'user'
    name: '1',
    description: '1',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewClient((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/clients/', newClient);
      console.log('Client created successfully:', response.data);
      // Handle success if needed
    } catch (error) {
      console.error('Error creating client:', error);
      // Handle error if needed
    }
    // Clear the input fields after the request is sent
    setNewClient({
      user: '',
      name: '',
      description: '',
    });
  };

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="user" // Make sure the name attributes match the field names in the model
          placeholder="User"
          value={newClient.user}
          onChange={handleChange}
        />

        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default AddClientForm;
