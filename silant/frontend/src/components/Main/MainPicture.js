import React from 'react';
import main_pic from "../../../static/_15_2_1.png";
import pic from "../../../static/new.svg";
import part1 from "../../../static/24_7.svg"
import './Picture.css'


const MainPicture = () => {
  return (
      <div className="main-picture-content">
          <img className="logo_picture" src={pic} alt="Logo Silant" />
          <div className="main-page_wrap">
              <div className="main-pic_text">
                  <p className="main_p">Reliable equipment the smooth operation and maintenance of which you can be sure of</p>
                   <img className="part1" src={part1} alt="Logo" />
              </div>
              <img className="main_picture" src={main_pic} alt="Picture Machine" />
          </div>


      </div>
  );
};

export default MainPicture;