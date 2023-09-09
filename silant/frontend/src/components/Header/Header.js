import React, {useState} from 'react';
import './Header.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";
import Login from "./Login";
import {useAuth} from "../Main/Auth/AuthContext";
import LogoutButton from "./Logout";

const Header = () => {
    const { isAuthenticated } = useAuth();

    return (
        <header className="header">
            <div className="header-main">
                <div className="header-upper">
                    <div className="logo">
                         <Link to="/" >
                             <Logo />
                         </Link>
                    </div>
                    <div className="header-info"> </div>
                    {isAuthenticated ? <LogoutButton /> : <Login />}
                </div>
                <div className="header-down">
                    <p></p>
                </div>
            </div>
        </header>
    );
};

export default Header;