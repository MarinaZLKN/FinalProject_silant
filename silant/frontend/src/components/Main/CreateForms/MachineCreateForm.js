import React, { useState } from 'react';
import axios from 'axios';

function MachineCreateForm() {
    const [machineData, setMachineData] = useState({
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
        technical_model: {
            name: '',
            description: ''
        },
        transmission_model: {
            name: '',
            description: ''
        },
        engine_model: {
            name: '',
            description: ''
        },
        controlled_bridge_model: {
            name: '',
            description: ''
        },
        driving_bridge_model: {
            name: '',
            description: ''
        },
        service_company: {
            name: {
                // details for CustomUser, e.g.:
                first_name: "John",
                last_name: "Doe",
                // ... other fields for CustomUser ...
            },
            description: "Some description",
        }
    });

    const handleChange = (e, nestedModel=null) => {
        if (nestedModel) {
            setMachineData(prevState => ({
                ...prevState,
                [nestedModel]: {
                    ...prevState[nestedModel],
                    [e.target.name]: e.target.value
                }
            }));
        } else {
            setMachineData(prevState => ({
                ...prevState,
                [e.target.name]: e.target.value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/api/machines/', machineData)
            .then(response => {
                console.log('machineData:', machineData);
                console.log('Response:', response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* Fields for Machine */}
                <input
                    type="text"
                    name="machine_factory_number"
                    onChange={handleChange}
                    placeholder="Machine Factory Number"
                />
                <input
                    type="text"
                    name="engine_factory_number"
                    onChange={handleChange}
                    placeholder="Engine Factory Number"
                />
                <input
                    type="text"
                    name="transmission_factory_number"
                    onChange={handleChange}
                    placeholder="Transmission Factory Number"
                />
                <input
                    type="text"
                    name="driving_bridge_factory_number"
                    onChange={handleChange}
                    placeholder="Driving Bridge Factory Number"
                />
                <input
                    type="text"
                    name="controlled_bridge_factory_number"
                    onChange={handleChange}
                    placeholder="Controlled Bridge Factory Number"
                />
                <input
                    type="text"
                    name="delivery_contract"
                    onChange={handleChange}
                    placeholder="Delivery Contract"
                />
                <input
                    type="date"
                    name="shipment_date"
                    onChange={handleChange}
                    placeholder="Shipment Date"
                />
                <input
                    type="text"
                    name="consignee"
                    onChange={handleChange}
                    placeholder="Consignee"
                />
                <input
                    type="text"
                    name="delivery_address"
                    onChange={handleChange}
                    placeholder="Delivery Address"
                />
                <input
                    type="text"
                    name="equipment"
                    onChange={handleChange}
                    placeholder="Equipment"
                />

                {/* Fields for TechnicalModel */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'technical_model')}
                    placeholder="Technical Model Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'technical_model')}
                    placeholder="Technical Model Description"
                ></textarea>

                {/* Fields for TransmissionModel */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'transmission_model')}
                    placeholder="Transmission Model Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'transmission_model')}
                    placeholder="Transmission Model Description"
                ></textarea>

                {/* Fields for EngineModel */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'engine_model')}
                    placeholder="Engine Model Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'engine_model')}
                    placeholder="Engine Model Description"
                ></textarea>

                {/* Fields for ControlledBridgeModel */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'controlled_bridge_model')}
                    placeholder="Controlled Bridge Model Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'controlled_bridge_model')}
                    placeholder="Controlled Bridge Model Description"
                ></textarea>

                {/* Fields for DrivingBridgeModel */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'driving_bridge_model')}
                    placeholder="Driving Bridge Model Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'driving_bridge_model')}
                    placeholder="Driving Bridge Model Description"
                ></textarea>

                {/* Fields for ServiceCompany */}
                <input
                    type="text"
                    name="name"
                    onChange={(e) => handleChange(e, 'service_company')}
                    placeholder="Service Company Name"
                />
                <textarea
                    name="description"
                    onChange={(e) => handleChange(e, 'service_company')}
                    placeholder="Service Company Description"
                ></textarea>


                <button type="submit">Create Machine</button>
            </form>
        </div>
    );
}

export default MachineCreateForm;

