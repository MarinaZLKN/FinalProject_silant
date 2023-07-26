// import React, { useState } from 'react';
// import axios from 'axios';
// import './MachineForm.css';
//
// const MachineForm = ({ machineData, onSubmit }) => {
//   const [formData, setFormData] = useState(machineData || {});
//
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };
//
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };
//
//   return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label htmlFor="machine_factory_number">Machine Factory Number</label>
//         <input
//           type="text"
//           id="machine_factory_number"
//           name="machine_factory_number"
//           value={formData.machine_factory_number || ''}
//           onChange={handleChange}
//         />
//       </div>
//       {/* Add other input fields for other machine properties */}
//       <button type="submit">Submit</button>
//     </form>
//   );
// };
//
// export default MachineForm;