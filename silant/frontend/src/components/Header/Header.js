import React from 'react';
import './Header.css'
import Logo from "./Logo";
import Login from "./Login";

const Header = () => {
    const handleAuthClick = () => {
        window.location.href = 'http://127.0.0.1:8000/accounts/register/';
     };
    return (
        <header className="header">
            <div className="header-main">
                <div className="header-upper">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="header-info"> +7-8352-20-12-09, telegram</div>
                    <button className="auth-btn" onClick={handleAuthClick}> Авторизация</button>
                    {/*<Login/>*/}
                </div>
                <div className="header-down">
                    <p>Электронная сервисная книжка "Мой Силант"</p>
                </div>
            </div>
        </header>
    );
};

export default Header;