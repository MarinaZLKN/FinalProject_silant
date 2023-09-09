import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import './Dashboard.css';
import {useAuth} from "./Auth/AuthContext";

const Dashboard = () => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null;
    }

  return (
      <div className="main-page_content">
          <div className="main-page_selection">
              <Link to="/machines" className="link-button" activeClassName="active-link">
                Machines
              </Link>
              <Link to="/maintenance" className="link-button" activeClassName="active-link">
                Maintenances
              </Link>
              <Link to="/claim" className="link-button" activeClassName="active-link">
                Claims
              </Link>
          </div>

      </div>
  );
};

export default Dashboard;