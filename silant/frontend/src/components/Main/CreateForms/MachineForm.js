import React, { useState } from "react";
import axios from "axios";
import './MachineForm.css';
import '../../Search/Search.css'

const MachineForm = () => {
  const [formData, setFormData] = useState({
    machine_factory_number: "",
    engine_factory_number: "",
    transmission_factory_number: "",
    driving_bridge_factory_number: "",
    controlled_bridge_factory_number: "",
    delivery_contract: "",
    shipment_date: "",
    consignee: "",
    delivery_address: "",
    equipment: "",
    client: "",
    service_company: "",
    engine_model: "",
    technical_model: "",
    transmission_model: "",
    driving_bridge_model: "",
    controlled_bridge_model: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/machines/", formData)
      .then((response) => {
        console.log("Machine created successfully:", response.data);
        // Redirect or show a success message here if needed
      })
      .catch((error) => {
        console.error("Error creating machine:", error);
        // Handle error if necessary
      });
  };

  return (
    <div className="form-container">
      <h2>Create a New Machine</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label className="form-label">Machine Factory Number:</label>
          <input
            type="text"
            name="machine_factory_number"
            value={formData.machine_factory_number}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Engine Factory Number:</label>
          <input
            type="text"
            name="engine_factory_number"
            value={formData.engine_factory_number}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Transmission Factory Number: </label>
          <input
            type="text"
            name="transmission_factory_number"
            value={formData.transmission_factory_number}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Driving Bridge Factory Number:</label>
          <input
            type="text"
            name="driving_bridge_factory_number"
            value={formData.driving_bridge_factory_number}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Controlled Bridge Factory Number:</label>
          <input
            type="text"
            name="controlled_bridge_factory_number"
            value={formData.controlled_bridge_factory_number}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Delivery Contract:</label>
          <input
            type="text"
            name="delivery_contract"
            value={formData.delivery_contract}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Shipment Date:</label>
          <input
            type="date"
            name="shipment_date"
            value={formData.shipment_date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Consignee:</label>
          <input
            type="text"
            name="consignee"
            value={formData.consignee}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Delivery Address:</label>
          <input
            type="text"
            name="delivery_address"
            value={formData.delivery_address}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Equipment:</label>
          <input
            type="text"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Client:</label>
          <input
            type="text"
            name="client"
            value={formData.client}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Service Company:</label>
          <input
            type="text"
            name="service_company"
            value={formData.service_company}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Engine Model:</label>
          <input
            type="text"
            name="engine_model"
            value={formData.engine_model}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Technical Model:</label>
          <input
            type="text"
            name="technical_model"
            value={formData.technical_model}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Transmission Model:</label>
          <input
            type="text"
            name="transmission_model"
            value={formData.transmission_model}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Driving Bridge Model:</label>
          <input
            type="text"
            name="driving_bridge_model"
            value={formData.driving_bridge_model}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-row">
          <label className="form-label">Controlled Bridge Model:</label>
          <input
            type="text"
            name="controlled_bridge_model"
            value={formData.controlled_bridge_model}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="search-btn">Create Machine</button>
          {/* You can add a cancel button here if needed */}
        </div>
      </form>
    </div>
  );
};

export default MachineForm;



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MachineCreateForm from "./MachineCreateForm";
//
// const MachineForm = () => {
//   const [formData, setFormData] = useState({
//     // Your form fields...
//     client: "",
//   });
//
//   const [clients, setClients] = useState([]);
//
//   useEffect(() => {
//     axios
//       .get("http://127.0.0.1:8000/api/clients/")
//       .then((response) => {
//         setClients(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching clients:", error);
//       });
//   }, []);
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://127.0.0.1:8000/api/machines/", formData)
//       .then((response) => {
//         console.log("Machine created successfully:", response.data);
//         // Redirect here!!!
//       })
//       .catch((error) => {
//         console.error("Error creating machine:", error);
//       });
//   };
//
//   // State to manage the modal visibility for adding a new client
//   const [isAddClientModalOpen, setIsAddClientModalOpen] = useState(false);
//
//   // Function to handle modal close event
//   const handleCloseAddClientModal = () => {
//     setIsAddClientModalOpen(false);
//   };
//
//   return (
//     <div>
//       <h2>Create a New Machine</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Your existing form inputs */}
//         <label>
//           Client:
//           <select
//             name="client"
//             value={formData.client}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Client</option>
//             {/* Map through the list of clients */}
//             {clients.map((client) => (
//               <option key={client.id} value={client.id}>
//                 {client.name}
//               </option>
//             ))}
//             {/* Add an option to add a new client */}
//             <option value="add_new">Add New Client</option>
//           </select>
//         </label>
//         {/* Your existing form inputs */}
//         <button type="submit">Create Machine</button>
//       </form>
//       {/* Modal for adding a new client */}
//       {isAddClientModalOpen && (
//         <div className="modal">
//           <div className="modal-content">
//             {/* Render the MachineCreateForm component here */}
//             <MachineCreateForm onCloseModal={handleCloseAddClientModal} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
//
// export default MachineForm;




// import React, { useState } from "react";
// import axios from "axios";
//
// const MachineForm = () => {
//   const [formData, setFormData] = useState({
//     machine_factory_number: "",
//     engine_factory_number: "",
//     transmission_factory_number: "",
//     driving_bridge_factory_number: "",
//     controlled_bridge_factory_number: "",
//     delivery_contract: "",
//     shipment_date: "",
//     consignee: "",
//     delivery_address: "",
//     equipment: "",
//     client: "",
//     service_company: "",
//     engine_model: "",
//     technical_model: "",
//     transmission_model: "",
//     driving_bridge_model: "",
//     controlled_bridge_model: "",
//   });
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://127.0.0.1:8000/api/machines/", formData)
//       .then((response) => {
//         console.log("Machine created successfully:", response.data);
//         // redirect here!!!
//       })
//       .catch((error) => {
//         console.error("Error creating machine:", error);
//       });
//   };
//
//   return (
//     <div>
//       <h2>Create a New Machine</h2>
//       <form onSubmit={handleSubmit}>
//         <label>
//           Machine Factory Number:
//           <input
//             type="text"
//             name="machine_factory_number"
//             value={formData.machine_factory_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Engine Factory Number:
//           <input
//             type="text"
//             name="engine_factory_number"
//             value={formData.engine_factory_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Transmission Factory Number:
//           <input
//             type="text"
//             name="transmission_factory_number"
//             value={formData.transmission_factory_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Driving Bridge Factory Number:
//           <input
//             type="text"
//             name="driving_bridge_factory_number"
//             value={formData.driving_bridge_factory_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Controlled Bridge Factory Number:
//           <input
//             type="text"
//             name="controlled_bridge_factory_number"
//             value={formData.controlled_bridge_factory_number}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Delivery Contract:
//           <input
//             type="text"
//             name="delivery_contract"
//             value={formData.delivery_contract}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Shipment Date:
//           <input
//             type="date"
//             name="shipment_date"
//             value={formData.shipment_date}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Consignee:
//           <input
//             type="text"
//             name="consignee"
//             value={formData.consignee}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Delivery Address:
//           <input
//             type="text"
//             name="delivery_address"
//             value={formData.delivery_address}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//         <label>
//           Equipment:
//           <input
//             type="text"
//             name="equipment"
//             value={formData.equipment}
//             onChange={handleChange}
//             required
//           />
//         </label>
//
//
//         <button type="submit">Create Machine</button>
//       </form>
//     </div>
//   );
// };
//
// export default MachineForm;
