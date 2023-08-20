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
        <h2>Приветствуем, {user.username}!</h2>
        <p> Ваш статус: {user.role}</p>
        <p> {user.first_name || " "}</p>
        <p>Информация о комплектации и технических характеристиках Вашей техники.</p>


    </div>
  );
};

export default PersonalBoard;
