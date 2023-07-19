import React from 'react';
import { Link } from 'react-router-dom';
import './Main.css';

const Main = () => {
  return (
      <div className="main-page_content">
          <div className="main-page_selection">
              <Link to="/machines" className="link-button" activeClassName="active-link">
                Машины
              </Link>
              <Link to="/claim" className="link-button" activeClassName="active-link">
                Рекламации
              </Link>
              <Link to="/maintenance" className="link-button" activeClassName="active-link">
                Техническое обслуживание
              </Link>
          </div>
          <div className="new">
              hello
          </div>
      </div>
  );
};

export default Main;