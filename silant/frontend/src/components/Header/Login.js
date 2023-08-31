import React, { useState } from 'react';
import axiosInstance from "../axiosConfig";
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../Main/Auth/AuthContext";
import './Login.css'
import Logout from "./Logout";



const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();


    // Destructure the login function from the AuthContext
    const { login, isAuthenticated, setUserPermissions, setUser } = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

     let fetchedPermissions;

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Sending credentials:', { username, password });
        let authToken;

        axiosInstance
            .post('http://127.0.0.1:8000/api/login', {
                username: username,
                password: password,
            })
            .then((response) => {
                console.log('Server Response:', response.data);
                authToken = response.data.key;
                axiosInstance.defaults.headers.common['Authorization'] = 'Token ' + authToken;
                console.log('Authorization Header Set:', axiosInstance.defaults.headers.common['Authorization']);

                // Fetching user permissions after successful login
                return axiosInstance.get('http://127.0.0.1:8000/api/permissions/');
            })
            .then((permResponse) => {
                fetchedPermissions = permResponse.data.permissions;
                setUserPermissions(fetchedPermissions);
                console.log('Permissions Fetched:', fetchedPermissions);

                return axiosInstance.get('http://127.0.0.1:8000/api/users/');
            })
            .then((userResponse) => {
                console.log(userResponse.data);
                const fetchedUser = userResponse.data.find(u => u.username === username);


                if (fetchedUser && fetchedPermissions) {
                    setUser(fetchedUser);
                    login(authToken, fetchedPermissions);
                } else {
                    console.warn("User or permissions were not fetched properly");
                    setErrorMessage("Failed to fetch user or permissions");
                }
                navigate('/');
             })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    setErrorMessage("Неверный логин или пароль");
                } else {
                    setErrorMessage("An unexpected error occurred");
                }
            });
    };


    if (isAuthenticated) {
        return <Logout />;
    }


    return (
        <div className="login-container">
            {/*<h2 className="login-title">Авторизация</h2>*/}
            <form className="login_form" onSubmit={handleSubmit}>
                <label className="login_label">
                    Username:
                    <input
                        className="login_input"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                        required
                    />
                </label>
                <label className="login_label">
                    Password:
                    <input
                        className="login_input"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </label>
                <button className="login-btn" type="submit">
                    <p className="login_p">Войти в систему</p>
                </button>
                {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Login;

