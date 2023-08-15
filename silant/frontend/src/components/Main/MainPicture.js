import React from 'react';
import main_pic from "../../../static/_15_2_1.png";
import './MachineTable.css'


const MainPicture = () => {
  return (
      <div >
          <img className="main_picture" src={main_pic} alt="Logo" />
      </div>
  );
};

export default MainPicture;