import React from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../Main/Auth/AuthContext";
import '../Main/MachineTable.css'

const LogoutButton = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout')
            .then(() => {
                logout();
                axios.defaults.headers.common['Authorization'] = '';
                navigate('/login');
            })
            .catch(error => {
                console.error("Failed to logout:", error);
            });
    };

    return (
        <button className="search-btn" onClick={handleLogout}>
            Logout
        </button>
    );
};


export default LogoutButton;
