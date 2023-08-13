import React from 'react';
import './Header.css'
import Logo from "./Logo";
import {Link} from "react-router-dom";

const Header = () => {

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
                    <button className="auth-btn">
                        <Link to="/create-machine">
                          <button type="button" className="search-btn">Добавить</button>
                        </Link>
                        {/*<Link to="/login" className="auth-link">*/}
                        {/*    <span className="auth-label">Авторизация</span> </Link>*/}
                    </button>
                </div>
                <div className="header-down">
                    <p>Электронная сервисная книжка "Мой Силант"</p>
                </div>
            </div>
        </header>
    );
};

export default Header;