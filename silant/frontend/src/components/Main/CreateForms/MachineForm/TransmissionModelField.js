import React, {useEffect, useState} from 'react';


function TransmissionModelField({ sendDataToServer, onCompleted }) {
    const [newTransmissionModel, setNewTransmissionModel] = useState({ name: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTransmissionModel(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/transmission_models/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTransmissionModel)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('transmission_model', data.id);
                } else {
                    sendDataToServer('transmission_model', null, data.error || "Error submitting transmission model.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newTransmissionModel]);

    return (
        <div>
            <input name="name" value={newTransmissionModel.name} onChange={handleInputChange} placeholder="Technical Model Name" />
            <input name="description" value={newTransmissionModel.description} onChange={handleInputChange} placeholder="Description" />
        </div>
    );
}

export default TransmissionModelField;