import React, {useState} from 'react';
import './Header.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";
import Login from "./Login";
import {useAuth} from "../Main/Auth/AuthContext";
import LogoutButton from "./Logout";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
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
                    <div className="header-info"> +7-8352-20-12-09, telegram</div>
                    {isAuthenticated ? <LogoutButton /> : <Login />}
                </div>
                <div className="header-down">
                    <p>Электронная сервисная книжка "Мой Силант"</p>
                </div>
            </div>
        </header>
    );
};

export default Header;