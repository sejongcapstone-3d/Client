import React from "react";
import "./RoomHeader.scss";
import LeftArrow from "../../common/icons/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import FillRoom from "../../common/icons/fill-room.svg";
import EmptyRoom from "../../common/icons/empty-room.svg";
import Furniture from "./Furniture";
import FurnitureList from "./FurnitureList";

const RoomHeader = (props) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <div className="room-header">
      {/* <div className="room-header-exit" onClick={backButtonHandler}>
        <img src={LeftArrow} alt="back-arrow"/>
      </div> */}
      <div className="room-header-main">
        <div>
          <img src={FillRoom} alt="fill-room" />
        </div>
        <div>
          <img src={EmptyRoom} alt="empty-room" />
        </div>
      </div>
      <FurnitureList addFurniture={props.addFurniture}/>
    </div>
  );
};

export default RoomHeader;
