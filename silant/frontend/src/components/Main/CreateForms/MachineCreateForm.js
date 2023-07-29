import React, { useState } from 'react';
import axios from 'axios';

const MachineCreateForm = () => {
  // State to manage the form data
  const [formData, setFormData] = useState({
    // Your other form fields...
    client: '',
  });

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // ... (Submit the form data to your backend API)
  };

  // Function to handle client selection
  const handleClientSelection = (value) => {
    if (value === 'add_new') {
      setIsModalOpen(true);
    } else {
      setFormData((prevData) => ({ ...prevData, client: value }));
    }
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle adding a new client
  const handleAddClient = async (newClientData) => {
    try {
      // Send a POST request to your backend API to create the new client
      const response = await axios.post('http://127.0.0.1:8000/api/clients/', newClientData);
      // Assuming the response contains the newly created client data with an ID
      const newClientId = response.data.id;
      // Update the client dropdown with the new client
      setFormData((prevData) => ({ ...prevData, client: newClientId }));
      // Close the modal after successful creation
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating client:', error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      {/* Your other form inputs... */}
      <div>
        <label>Client:</label>
        <select
          name="client"
          value={formData.client}
          onChange={(e) => handleClientSelection(e.target.value)}
          required
        >
          <option value="">Select Client</option>
          {/* Map through the list of clients */}
          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
          {/* Add an option to add a new client */}
          <option value="add_new">Add New Client</option>
        </select>
      </div>
      {/* Your other form inputs and submit button... */}

      {/* Modal for adding a new client */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Client</h2>
            {/* Add your form fields for creating a new client here */}
            <form onSubmit={handleSubmit}>
              <label>Name:</label>
              <input type="text" name="name" required />

              {/* Add other client-related form fields as needed... */}

              <button type="submit" onClick={handleAddClient}>
                Create Client
              </button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MachineCreateForm;
