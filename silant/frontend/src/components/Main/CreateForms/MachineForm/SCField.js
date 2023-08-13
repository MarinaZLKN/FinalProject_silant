import { useState, useEffect } from 'react';
import React from 'react';

function SCField({ sendDataToServer, onCompleted }) {
    const [newSC, setNewSC] = useState({
        name: { username: "", first_name: "", last_name: "", email: "", role: "Клиент" },
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in newSC.name) {
            setNewSC(prev => ({
                ...prev,
                name: { ...prev.name, [name]: value }
            }));
        } else {
            setNewSC(prev => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/service_companies/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newSC)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('client', data.id);
                } else {
                    sendDataToServer('client', null, data.error || "Error submitting client.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newSC]);

    return (
        <div>
            <input
                name="username"
                value={newSC.name.first_name}
                onChange={handleInputChange}
                placeholder="Username"
            />

            <textarea
                name="description"
                value={newSC.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    );
}

export default SCField;