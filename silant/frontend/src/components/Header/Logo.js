import React from "react";
import logo from '../../../static/photo.svg'
import './Header.css'

const Logo = () => {
  return (
      <div className="app-logo">
          <img src={logo} alt="Logo" />
      </div>
  );
};

export default Logo;