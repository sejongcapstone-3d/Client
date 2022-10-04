import React from "react";
import "./RoomHeader.scss";
import LeftArrow from "../../common/icons/back-arrow.svg"

const RoomHeader = () => {
  return (
    <div className="room-header">
      <div className="room-header-exit">
        <img src={LeftArrow} alt="back-arrow"/>
      </div>
      <div className="room-header-main"></div>
      <div className="room-header-sub"></div>
    </div>
  );
};

export default RoomHeader;
