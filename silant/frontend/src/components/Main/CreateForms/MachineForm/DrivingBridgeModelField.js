import { useState, useEffect } from 'react';
import React from 'react';
function DrivingBridgeModelField({ sendDataToServer, onCompleted }) {
    const [newDrivingBridge, setNewDrivingBridge] = useState({ name: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewDrivingBridge(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/controlled_bridge_models/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newDrivingBridge)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('driving_bridge_model', data.id);
                } else {
                    sendDataToServer('driving_bridge_model', null, data.error || "Error submitting controlled bridge model.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newDrivingBridge]);

    return (
        <div>
            <input
                name="name"
                value={newDrivingBridge.name}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <textarea
                name="description"
                value={newDrivingBridge.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    );
}

export default DrivingBridgeModelField;