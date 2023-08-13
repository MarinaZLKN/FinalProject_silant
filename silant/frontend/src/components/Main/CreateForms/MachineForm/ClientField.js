import { useState, useEffect } from 'react';
import React from 'react';

function ClientField({ sendDataToServer, onCompleted }) {
    const [newClient, setNewClient] = useState({
        name: { username: "", first_name: "", last_name: "", email: "", role: "Клиент" },
        description: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name in newClient.name) {
            setNewClient(prev => ({
                ...prev,
                name: { ...prev.name, [name]: value }
            }));
        } else {
            setNewClient(prev => ({ ...prev, [name]: value }));
        }
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/clients/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newClient)
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
    }, [sendDataToServer, newClient]);

    return (
        <div>
            <input
                name="username"
                value={newClient.name.username}
                onChange={handleInputChange}
                placeholder="Username"
            />

            <textarea
                name="description"
                value={newClient.description}
                onChange={handleInputChange}
                placeholder="Description"
            />
        </div>
    );
}

export default ClientField;