import React, {useEffect, useState} from 'react';


function TechnicalModelField({ sendDataToServer }) {
    const [newTechnicalModel, setNewTechnicalModel] = useState({ name: "", description: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTechnicalModel(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (sendDataToServer) {
            async function postData() {
                const apiUrl = "http://127.0.0.1:8000/api/technical_models/";

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newTechnicalModel)
                });

                const data = await response.json();
                if (response.ok) {
                    sendDataToServer('technical_model', data.id);
                } else {
                    sendDataToServer('technical_model', null, data.error || "Error submitting technical model.");
                }
            }

            postData();
        }
    }, [sendDataToServer, newTechnicalModel]);

    return (
        <div>
            <input name="name" value={newTechnicalModel.name} onChange={handleInputChange} placeholder="Technical Model Name" />
            <input name="description" value={newTechnicalModel.description} onChange={handleInputChange} placeholder="Description" />
        </div>
    );
}

export default TechnicalModelField;
