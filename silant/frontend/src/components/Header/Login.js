import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {useAuth} from "../Main/Auth/AuthContext";
import './Login.css'
import Logout from "./Logout";

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/',
});

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    // Destructure the login function from the AuthContext
    const { login, isAuthenticated } = useAuth();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Sending credentials:', { username, password });

        axiosInstance
            .post('http://127.0.0.1:8000/api/login', {
                username: username,
                password: password,
            })
            .then((response) => {
                console.log('Server Response:', response.data);
                const authToken = response.data.key;
                login(authToken);
                axiosInstance.defaults.headers.common['Authorization'] = 'Token ' + authToken;
                console.log('Authorization Header Set:', axiosInstance.defaults.headers.common['Authorization']);

                navigate('/');
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.data) {
                    setErrorMessage(error.response.data.error);
                } else {
                    setErrorMessage('An error occurred. Please try again.');
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
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
//
// const Login = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//
//   const navigate = useNavigate();
//
//   const handleUsernameChange = (event) => {
//     setUsername(event.target.value);
//   };
//
//   const handlePasswordChange = (event) => {
//     setPassword(event.target.value);
//   };
//
//   const handleLogin = () => {
//     axios
//       .post('http://127.0.0.1:8000/login/', {
//         username: username,
//         password: password,
//       })
//       .then((response) => {
//         const authToken = response.data.access_token;
//         localStorage.setItem('authToken', authToken);
//
//         // Redirect to the desired page
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error(error);
//         if (error.response && error.response.data) {
//           setErrorMessage(error.response.data.detail);
//         } else {
//           setErrorMessage('An error occurred. Please try again.');
//         }
//       });
//   };
//
//   return (
//     <div className="login-container">
//       <h2 className="login-title">Авторизация</h2>
//       <form className="login_form">
//         <label className="login_label">
//           Никнейм:
//           <input
//             className="login_input"
//             type="text"
//             value={username}
//             onChange={handleUsernameChange}
//           />
//         </label>
//         <label className="login_label">
//           Пароль:
//           <input
//             className="login_input"
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//           />
//         </label>
//         <button className="login-btn" type="button" onClick={handleLogin}>
//           Войти в систему
//         </button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// };
//
// export default Login;



