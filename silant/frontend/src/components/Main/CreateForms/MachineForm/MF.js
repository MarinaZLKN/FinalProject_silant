import React, { useState } from 'react';
import ForeignKeyField from './ForeignKeyField'; // adjust path as necessary

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
        client: { name: { id: null, username: '', first_name: '', last_name: '', email: '', role: 'Клиент' }, description: '' },
        service_company: { name: { id: null, username: '', first_name: '', last_name: '', email: '', role: 'Сервис' }, description: '' },
        engine_model: { name: '', description: '' },
        technical_model: { name: '', description: '' },
        transmission_model: { name: '', description: '' },
        driving_bridge_model: { name: '', description: '' },
        controlled_bridge_model: { name: '', description: '' },
    });

    const [feedback, setFeedback] = useState(''); // New state for feedback message

    // const isFormValid = () => {
    //     // Basic validation to ensure all fields are filled
    //     for (let key in machine) {
    //         if (!machine[key]) return false;
    //     }
    //     return true;
    // };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMachine(prev => ({ ...prev, [name]: value }));
    };

    const handleForeignKeyChange = (name, value) => {
        console.log("Updating", name, "with value", value); // Log to debug
        setMachine(prev => ({ ...prev, [name]: value }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation: Ensure all fields are filled before submitting.
        const isFormValid = () => {
            for (let key in machine) {
                if (!machine[key]) return false;
            }
            return true;
        };

        if (!isFormValid()) {
            setFeedback('Please fill all fields.');
            return;
        }

        const apiUrl = 'http://127.0.0.1:8000/api/machines/';

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(machine)
            });

            const data = await response.json();  // Assuming server responds with json

            if(response.ok) {
                setFeedback("Successfully submitted.");
                // If you have any post-submission logic, like redirecting to another page, you can add that here
            } else {
                // Improved error message
                setFeedback(data.error || "Error submitting form.");
                // Handle errors, maybe update the UI to show an error message
            }
        } catch (error) {
            setFeedback("There was an error submitting the form. Please try again.");
            // Handle unexpected errors, maybe update the UI to show an error message
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

                <ForeignKeyField name="client" data={machine.client} onChange={handleForeignKeyChange}/>
                <ForeignKeyField name="technical_model" data={machine.technical_model} onChange={handleForeignKeyChange}/>
                <ForeignKeyField name="transmission_model" data={machine.transmission_model} onChange={handleForeignKeyChange} />
                <ForeignKeyField name="driving_bridge_model" data={machine.driving_bridge_model} onChange={handleForeignKeyChange}/>
                <ForeignKeyField name="controlled_bridge_model" data={machine.controlled_bridge_model} onChange={handleForeignKeyChange} />
                <ForeignKeyField name="engine_model" data={machine.engine_model} onChange={handleForeignKeyChange} />
                <ForeignKeyField name="service_company" data={machine.service_company} onChange={handleForeignKeyChange}/>


            <button type="submit">Save</button>
        </form>
        {feedback && <p>{feedback}</p>}
        </>

    );
}

export default MF;
