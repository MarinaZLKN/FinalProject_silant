import { useState, useEffect } from 'react';
import React from 'react';
function ControlledBridgeModelField({ sendDataToServer, onCompleted }) {
    const [newControlledBridge, setNewControlledBridge] = useState({ name: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewControlledBridge(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/controlled_bridge_models/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newControlledBridge)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('controlled_bridge_model', data.id);
                } else {
                    sendDataToServer('controlled_bridge_model', null, data.error || "Error submitting controlled bridge model.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newControlledBridge]);

    return (
        <div>
            <input
                name="name"
                value={newControlledBridge.name}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <textarea
                name="description"
                value={newControlledBridge.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    );
}

export default ControlledBridgeModelField;