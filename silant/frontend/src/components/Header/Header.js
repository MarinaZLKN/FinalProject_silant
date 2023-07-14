import React from 'react';
import './Header.css'
import Logo from "./Logo";

const Header = () => {
    return (
        <header className="header">
            <div className="header-main">
                <div className="header-upper">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="header-info"> +7-8352-20-12-09, telegram</div>
                    <button className="auth-btn"> Авторизация</button>
                </div>
                <div className="header-down">
                    <p>Электронная сервисная книжка "Мой Силант"</p>
                </div>
            </div>
        </header>
    );
};

export default Header;