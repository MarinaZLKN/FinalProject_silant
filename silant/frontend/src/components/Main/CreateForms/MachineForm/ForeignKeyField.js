import React, { useState } from 'react';

function ForeignKeyField({ name, data, onChange }) {
    const isServiceCompany = name === "service_company";

    const defaultData = isServiceCompany
        ? { name: { id: null, username: '', first_name: '', last_name: '', email: '',  role: 'Сервис' }, description: '' }
        : { name: '', description: '' };

    const [localData, setLocalData] = useState(data || defaultData);

    const handleLocalChange = (key, val) => {
        if (isServiceCompany && (key === "username" || key === "first_name" || key === "last_name" || key === "email" || key === "role")) {
            setLocalData(prev => ({ ...prev, name: { ...prev.name, [key]: val } }));
            onChange(name, { ...localData, name: { ...localData.name, [key]: val } });
        } else {
            setLocalData(prev => ({ ...prev, [key]: val }));
            onChange(name, { ...localData, [key]: val });
        }
    };

    const handleBlur = () => {
        onChange(name, localData);
    }

    return (
        <div>
            {isServiceCompany ? (
                <>
                    <input
                        name={`${name}_username`}
                        value={localData.name.username}
                        onChange={e => handleLocalChange('username', e.target.value)}
                        onBlur={handleBlur}
                        placeholder={`${name} Username`}
                    />
                    {/* Note: You can add other fields like first_name, last_name, email, role similarly if needed */}
                </>
            ) : (
                <>
                    <input
                        name={`${name}_name`}
                        value={localData.name}
                        onChange={e => handleLocalChange('name', e.target.value)}
                        onBlur={handleBlur}
                        placeholder={`${name} Name`}
                    />
                </>
            )}
            <textarea
                name={`${name}_description`}
                value={localData.description}
                onChange={e => handleLocalChange('description', e.target.value)}
                onBlur={handleBlur}
                placeholder={`${name} Description`}>
            </textarea>
        </div>
    );
}

export default ForeignKeyField;
