import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './MachineForm.css'
import AddClientForm from "./MachineForm/AddClientForm";

const MachineForm = () => {
    const [machine, setMachine] = useState({
        machine_factory_number: '',
        engine_factory_number: '',
        transmission_factory_number: '',
        driving_bridge_factory_number: '',
        controlled_bridge_factory_number: '',
        delivery_contract: '',
        shipment_date: '',
        consignee: '',
        delivery_address: '',
        equipment: '',
        client: '',
        service_company: '',
        engine_model: '',
        technical_model: '',
        transmission_model: '',
        driving_bridge_model: '',
        controlled_bridge_model: '',
    });

    // const [newClient, setNewClient] = useState('');
    //
    //  const handleClientChange = (e) => {
    //     setNewClient(e.target.value);
    //   };

     // const createNewClient = async () => {
     //    try {
     //      const response = await axios.post('http://127.0.0.1:8000/api/clients/', {
     //        name: newClient,
     //      });
     //      return response.data.id;
     //    } catch (error) {
     //      console.error(error);
     //      return null;
     //    }
     // };



    const [data, setData] = useState({
        clients: [],
        serviceCompanies: [],
        engineModels: [],
        technicalModels: [],
        transmissionModels: [],
        drivingBridgeModels: [],
        controlledBridgeModels: [],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseClients = await axios.get('http://127.0.0.1:8000/api/clients/');
                const responseServiceCompanies = await axios.get('http://127.0.0.1:8000/api/service_companies/');
                const responseEngineModels = await axios.get('http://127.0.0.1:8000/api/engine_models/');
                const responseTechnicalModels = await axios.get('http://127.0.0.1:8000/api/technical_models/');
                const responseTransmissionModels = await axios.get('http://127.0.0.1:8000/api/transmission_models/');
                const responseDrivingBridgeModels = await axios.get('http://127.0.0.1:8000/api/driving_bridge_models/');
                const responseControlledBridgeModels = await axios.get('http://127.0.0.1:8000/api/controlled_bridge_models/');

                setData({
                    clients: responseClients.data,
                    serviceCompanies: responseServiceCompanies.data,
                    engineModels: responseEngineModels.data,
                    technicalModels: responseTechnicalModels.data,
                    transmissionModels: responseTransmissionModels.data,
                    drivingBridgeModels: responseDrivingBridgeModels.data,
                    controlledBridgeModels: responseControlledBridgeModels.data,
                });
                console.log('Data to server:', data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachine({
            ...machine,
            [name]: name === 'client' || name === 'service_company' ? parseInt(value) : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const additionalFormData = {
            client: parseInt(e.target.client.value),
            service_company: parseInt(e.target.service_company.value),
            engine_model: parseInt(e.target.engine_model.value),
            technical_model: parseInt(e.target.technical_model.value),
            transmission_model: parseInt(e.target.transmission_model.value),
            driving_bridge_model: parseInt(e.target.driving_bridge_model.value),
            controlled_bridge_model: parseInt(e.target.controlled_bridge_model.value),
      };

       const postData = {
          ...machine,
          ...additionalFormData,
       };


        console.log('postData: ', postData)

        axios.post('http://127.0.0.1:8000/api/machines/', postData)
            .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with an error:', error.response.data);
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            });
    };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //
    //     const parseValue = (value) => {
    //         const parsed = parseInt(value);
    //         if (isNaN(parsed)) {
    //             throw new Error(`Failed to parse value: ${value}`);
    //         }
    //         return parsed;
    //     }
    //
    //     const additionalFormData = {
    //         client: parseValue(e.target.client.value),
    //         service_company: parseValue(e.target.service_company.value),
    //         engine_model: parseValue(e.target.engine_model.value),
    //         technical_model: parseValue(e.target.technical_model.value),
    //         transmission_model: parseValue(e.target.transmission_model.value),
    //         driving_bridge_model: parseValue(e.target.driving_bridge_model.value),
    //         controlled_bridge_model: parseValue(e.target.controlled_bridge_model.value),
    //     };
    //
    //     const postData = {
    //         ...machine,
    //         ...additionalFormData,
    //     };
    //
    //     console.log('postData: ', postData);
    //
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/machines/', postData, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         console.log('Response:', response.data);
    //     } catch (error) {
    //         if (error.response) {
    //             console.error('Server responded with an error:', error.response.data);
    //         } else if (error.request) {
    //             console.error('No response received from server:', error.request);
    //         } else {
    //             console.error('Error setting up the request:', error.message);
    //         }
    //     }
    // };



    return (
        <div className="form-container">
            <h2 className="machine-form_h2">Добавить новую машину</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                      <label className="form-label">Machine Factory Number:</label>
                      <input
                        type="text"
                        name="machine_factory_number"
                        value={machine.machine_factory_number}
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
                        value={machine.engine_factory_number}
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
                        value={machine.transmission_factory_number}
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
                        value={machine.driving_bridge_factory_number}
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
                        value={machine.controlled_bridge_factory_number}
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
                        value={machine.delivery_contract}
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
                        value={machine.shipment_date}
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
                        value={machine.consignee}
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
                        value={machine.delivery_address}
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
                        value={machine.equipment}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                <div className="form-row">
                    <label className="form-label">Client:</label>
                        {/*<AddClientForm/>*/}
                          {/*<input*/}
                          {/*  type="text"*/}
                          {/*  name="client"*/}
                          {/*  value={newClient}*/}
                          {/*  onChange={handleClientChange}*/}
                          {/*  required*/}
                          {/*  className="form-input"*/}
                          {/*/>*/}
                     <label className="form-label">
                        <select className="option"  name="client" onChange={handleChange}>
                            {data.clients.map(client => (
                                <option value={client.id}>{client.name.first_name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Service Company:
                            <select name="service_company" onChange={handleChange}>
                                {data.serviceCompanies.map(company => (
                                    <option value={company.name.id}>{company.name.first_name}</option>
                                ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Engine Model:
                        <select name="engine_model" onChange={handleChange}>
                            {data.engineModels.map(model => (
                                <option value={model.id}>{model.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Technical Model:
                        <select name="technical_model" onChange={handleChange}>
                            {data.technicalModels.map(model => (
                                <option value={model.id}>{model.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Transmission Model:
                        <select name="transmission_model" onChange={handleChange}>
                            {data.transmissionModels.map(model => (
                                <option value={model.id}>{model.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Driving Bridge Model:
                        <select name="driving_bridge_model" onChange={handleChange}>
                            {data.drivingBridgeModels.map(model => (
                                <option value={model.id}>{model.name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                 <div className="form-row">
                     <label className="form-label">
                        Controlled Bridge Model:
                        <select name="controlled_bridge_model" onChange={handleChange}>
                            {data.controlledBridgeModels.map(model => (
                                <option value={model.id}>{model.name}</option>
                            ))}
                        </select>
                     </label>
                </div>

                <div className="form-buttons">
                    <button type="submit" className="search-btn">Создать</button>
                </div>
        </form>
        </div>

    );
};

export default MachineForm;


