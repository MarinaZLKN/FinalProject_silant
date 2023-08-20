import React from 'react';
import main_pic from "../../../static/_15_2_1.png";
import pic from "../../../static/new.svg";
import part1 from "../../../static/part1.svg"
import './Picture.css'


const MainPicture = () => {
  return (
      <div className="main-picture-content">
          <img className="logo_picture" src={pic} alt="Logo" />
          <div className="main-page_wrap">
              <img className="main_picture" src={main_pic} alt="Logo" />
              <div className="main-pic_text">
                   <img className="part1" src={part1} alt="Logo" />
              </div>
          </div>


      </div>
  );
};

export default MainPicture;