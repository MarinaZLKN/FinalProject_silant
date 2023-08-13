import React, { useState } from 'react';
import ForeignKeyField from './ForeignKeyField';
import TechnicalModelField from "./TechnicalModelField";
import EngineModelField from "./EngineModelField";
import TransmissionModelField from "./TransmissionModelField";
import ControlledBridgeModelField from "./ControlledBridgeModelField";
import DrivingBridgeModelField from "./DrivingBridgeModelField";
import SCField from "./SCField";
import ClientField from "./ClientField";

function MF() {
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
        client: null,
        service_company: null,
        engine_model: null,
        technical_model: null,
        transmission_model: null,
        driving_bridge_model: null,
        controlled_bridge_model: null,
    });



    const [feedback, setFeedback] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachine(prev => ({ ...prev, [name]: value }));
    };

    const updateMachineData = (field, id) => {
        setMachine(prev => ({ ...prev, [field]: id }));
    };

    const sendDataToServer = (fieldName, id, error) => {
        if (id) {
            setMachine(prevState => ({ ...prevState, [fieldName]: id }));
        } else if (error) {
            setFeedback(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = 'http://127.0.0.1:8000/api/machines/';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machine)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Successfully submitted:", data);

            } else {
                console.error("Error submitting form:", data);

            }
        } catch (error) {
            console.error("There was an error:", error);
        }
    };


    return (
        <>
            <form onSubmit={handleSubmit}>
                <input name="machine_factory_number" value={machine.machine_factory_number} onChange={handleChange} placeholder="Machine Factory Number" />
                <input name="engine_factory_number" value={machine.engine_factory_number} onChange={handleChange} placeholder="Engine Factory Number" />
                <input name="transmission_factory_number" value={machine.transmission_factory_number} onChange={handleChange} placeholder="Transmission Factory Number" />
                <input name="driving_bridge_factory_number" value={machine.driving_bridge_factory_number} onChange={handleChange} placeholder="Driving Bridge Factory Number" />
                <input name="controlled_bridge_factory_number" value={machine.controlled_bridge_factory_number} onChange={handleChange} placeholder="Controlled Bridge Factory Number" />
                <input name="delivery_contract" value={machine.delivery_contract} onChange={handleChange} placeholder="Delivery Contract" />
                <input type="date" name="shipment_date" value={machine.shipment_date} onChange={handleChange} placeholder="Shipment Date" />
                <input name="consignee" value={machine.consignee} onChange={handleChange} placeholder="Consignee" />
                <input name="delivery_address" value={machine.delivery_address} onChange={handleChange} placeholder="Delivery Address" />
                <input name="equipment" value={machine.equipment} onChange={handleChange} placeholder="Equipment" />

                <TransmissionModelField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <TechnicalModelField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <EngineModelField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <ControlledBridgeModelField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <DrivingBridgeModelField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <SCField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />
                <ClientField sendDataToServer={sendDataToServer} onUpdate={updateMachineData} />

            <button type="submit">Save</button>
        </form>
        {feedback && <p>{feedback}</p>}
        </>

    );
}

export default MF;
