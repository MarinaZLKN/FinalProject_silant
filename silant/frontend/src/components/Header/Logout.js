import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";

function LogoutButton() {

    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout');
            if (response.status === 200) {
                console.log('Successfully logged out.');
                navigate('/');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
}

export default LogoutButton;
