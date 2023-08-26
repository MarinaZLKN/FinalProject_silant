import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    permissions: [],
    login: () => {},
    logout: () => {}
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
    const [permissions, setPermissions] = useState([]);
    const [user, setUser] = useState(null);


    const login = (token, userPermissions) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('permissions', JSON.stringify(userPermissions));
        setIsAuthenticated(true);

    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('permissions');
        setIsAuthenticated(false);
        setPermissions([]);
    };

    const setUserPermissions = (perms) => {
        setPermissions(perms);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, permissions, setUserPermissions, setUser, user }}>
            {children}
        </AuthContext.Provider>
    );
};
