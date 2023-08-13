import { useState, useEffect } from 'react';
import React from 'react';
function EngineModelField({ sendDataToServer, onCompleted }) {
    const [newEngineModel, setNewEngineModel] = useState({ name: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewEngineModel(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/engine_models/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newEngineModel)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('engine_model', data.id);
                } else {
                    sendDataToServer('engine_model', null, data.error || "Error submitting engine model.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newEngineModel]);

    return (
        <div>
            <input
                name="name"
                value={newEngineModel.name}
                onChange={handleInputChange}
                placeholder="Name"
            />
            <textarea
                name="description"
                value={newEngineModel.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    );
}

export default EngineModelField;