import React from "react";
import "./RoomHeader.scss";
import { useNavigate } from "react-router-dom";
import FillRoom from "../../common/icons/fill-room.svg";
import EmptyRoom from "../../common/icons/empty-room.svg";
import Furniture from "./Furniture";
import FurnitureList from "./FurnitureList";

import TopArrow from "../../common/icons/top-arrow.svg";
import Delete from "../../common/icons/delete.svg";
import Info from "../../common/icons/info.svg";

const RoomHeader = (props) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(-1);
  };

  return (
    <div className="room-header">
      <div className="room-header-main">
        <div>
          <img src={FillRoom} alt="fill-room" />
        </div>
        <div>
          <img src={EmptyRoom} alt="empty-room" />
        </div>
      </div>
      <FurnitureList addFurniture={props.addFurniture}/>
      <div className="room-header-sub">
        <div className="room-header-sub-item">
          <img src={Delete} alt="clear"/>
        </div>
        <div className="room-header-sub-item">
          <img src={Info} alt="info" />
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
