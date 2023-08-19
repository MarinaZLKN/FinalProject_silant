import React, { useState, useEffect } from 'react';
import './MachineForm.css'
import {useAuth} from "../Auth/AuthContext";
import axios from "axios";
import axiosInstance from "../../axiosConfig";

const parseValue = (value) => {
    if (value === "") return null;
    const intValue = parseInt(value);
    return isNaN(intValue) ? value : intValue;
};

const MachineForm = () => {
    // State Initialization - state holds details related to a machine
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

    const { permissions } = useAuth();

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
                const responseClients = await axiosInstance.get('http://127.0.0.1:8000/api/clients/');
                const responseServiceCompanies = await axiosInstance.get('http://127.0.0.1:8000/api/service_companies/');
                const responseEngineModels = await axiosInstance.get('http://127.0.0.1:8000/api/engine_models/');
                const responseTechnicalModels = await axiosInstance.get('http://127.0.0.1:8000/api/technical_models/');
                const responseTransmissionModels = await axiosInstance.get('http://127.0.0.1:8000/api/transmission_models/');
                const responseDrivingBridgeModels = await axiosInstance.get('http://127.0.0.1:8000/api/driving_bridge_models/');
                const responseControlledBridgeModels = await axiosInstance.get('http://127.0.0.1:8000/api/controlled_bridge_models/');

                setData({
                    clients: responseClients.data,
                    serviceCompanies: responseServiceCompanies.data,
                    engineModels: responseEngineModels.data,
                    technicalModels: responseTechnicalModels.data,
                    transmissionModels: responseTransmissionModels.data,
                    drivingBridgeModels: responseDrivingBridgeModels.data,
                    controlledBridgeModels: responseControlledBridgeModels.data,
                });
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // This function handles changes to form inputs. Whenever an input value changes, it updates
    // the corresponding value in the machine state.
    // For certain fields (defined in the fieldsToInt array), the function attempts to convert the input value
    // to an integer before saving it to the state. If the value isn't a valid number,
    // it won't update the state for that particular field.
    const handleChange = (e) => {
        const { name, value } = e.target;

        const fieldsToInt = [
            'client',
            'service_company',
            'engine_model',
            'technical_model',
            'transmission_model',
            'driving_bridge_model',
            'controlled_bridge_model'
        ];

        if (fieldsToInt.includes(name) && value !== "") {
            const newValue = parseInt(value, 10);

            if (!isNaN(newValue)) {
                setMachine(prevMachine => ({
                    ...prevMachine,
                    [name]: newValue,
                }));
            }
        } else {
            setMachine(prevMachine => ({
                ...prevMachine,
                [name]: value,
            }));
        }
    };
    // On submit, first, it constructs the additionalFormData object by gathering and parsing the relevant
    // form values into integers. This seems a bit redundant since handleChange already does this
    // for some fields. Unless there's a specific reason for this, you might be able to optimize this step.
    // The postData object is then created by merging the values of machine and additionalFormData.
    // A POST request is then sent to the server with postData as the request body. If the request is successful,
    // the response is logged to the console. If there's an error, appropriate error handling and
    // logging are done based on the nature of the error.
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("User permissions:", permissions);

        if (!permissions.includes("backend.add_machine")) {
            console.error("User does not have permission to add a machine.");
            return;
        }

        const additionalFormData = {
            client: parseValue(e.target.client.value),
            service_company: parseValue(e.target.service_company.value),
            engine_model: parseValue(e.target.engine_model.value),
            technical_model: parseValue(e.target.technical_model.value),
            transmission_model: parseValue(e.target.transmission_model.value),
            driving_bridge_model: parseValue(e.target.driving_bridge_model.value),
            controlled_bridge_model: parseValue(e.target.controlled_bridge_model.value),
      };

       const postData = {
          ...machine,
          ...additionalFormData,
       };

        axiosInstance.post('http://127.0.0.1:8000/api/machines/', postData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }) .then(response => {
                console.log('Response:', response.data);
            })
            .catch(error => {
                if (error.response) {
                    console.error('Server responded with an error:', error.response.status, error.response.data);
                    if (error.response.data) {
                        for (const [key, value] of Object.entries(error.response.data)) {
                            console.error(`${key}: ${value}`);
                        }
                    }
                } else if (error.request) {
                    console.error('No response received from server:', error.request);
                } else {
                    console.error('Error setting up the request:', error.message);
                }
            });
    };



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
                     <label className="form-label">
                        <select className="option"  name="client" onChange={handleChange}>
                            {data.clients.map(client => (
                                <option  key={client.id} value={client.id}>{client.name.first_name}</option>
                            ))}
                        </select>
                     </label>
                </div>
                <div className="form-row">
                     <label className="form-label">
                        Service Company:
                            <select name="service_company" onChange={handleChange}>
                                {data.serviceCompanies.map(company => (
                                    <option key={company.id} value={company.id}>{company.name.first_name}</option>
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


