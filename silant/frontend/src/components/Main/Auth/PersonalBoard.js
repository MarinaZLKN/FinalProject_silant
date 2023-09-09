import React from 'react';
import { useAuth } from './AuthContext';
import './PersonalBoard.css';

const PersonalBoard = () => {
  const { user } = useAuth();

  if (!user) {
    return <div></div>;
  }

  return (
    <div className="personal_board">
        <h2>Welcome, {user.username}!</h2>
        <p> Your status: {user.role}</p>
        <p> {user.first_name || " "}</p>
        <p>Information about the configuration and technical characteristics of your equipment.</p>


    </div>
  );
};

export default PersonalBoard;
