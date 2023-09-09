import React from 'react';
import main_pic from "../../../static/_1__2_1_1.png";
import icon1 from "../../../static/icon1.png";
import icon2 from "../../../static/icon2.png";
import icon3 from "../../../static/icon3.png";
import icon4 from "../../../static/icon4.png";
import icon5 from "../../../static/icon5.png";
import icon6 from "../../../static/icon6.png";


import './Picture.css'


const MainPagePicture = () => {
  return (
      <div className="main-page_content">
          <div className="main-page_upper">
              <div className="upper-title">
                  <p className="title-1">Hardy. Practical. Reliable!</p>
                  <p className="title-2">WIDE RANGE OF ATTACHMENTS</p>
              </div>
          </div>
          <div className="main-page_down">
              <div className="down-1">
                  <div className="down_box">
                      <img className="icon" src={icon1} alt="icon1"/>
                      <p className="box-text">Reliable. High reliability of main components and assemblies</p>
                  </div>
                  <div className="down_box">
                      <img className="icon" src={icon2} alt="icon2"/>
                      <p className="box-text">Lasting. High safety margin laid down by our designers</p>
                  </div>
                  <div className="down_box">
                      <img className="icon" src={icon3} alt="icon3"/>
                      <p className="box-text">Understandable. Simple mechanisms suitable for self-repair</p>
                  </div>
              </div>
              <div className="down-2">
                  <img className="main-page_picture" src={main_pic} alt="Logo" />
              </div>
              <div className="down-3">
                  <div className="down_box">
                      <img className="icon" src={icon4} alt="icon4"/>
                      <p className="box-text">Hardy. Adapted to work in conditions of Siberian frosts and Krasnodar heat</p>
                  </div>
                  <div className="down_box">
                      <img className="icon" src={icon5} alt="icon5"/>
                      <p className="box-text">Compact. Turns around on a small space and easily maneuvers in tight warehouses</p>
                  </div>
                  <div className="down_box">
                      <img className="icon" src={icon6} alt="icon6"/>
                      <p className="box-text">Practical. Mechanisms and control systems that minimize the human factor</p>
                  </div>
              </div>
          </div>

      </div>
  );
};

export default MainPagePicture;