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
import { furnitureActions } from "../../redux/furnitureSlice";
import { useDispatch } from "react-redux";

const RoomHeader = (props) => {
  const dispatch = useDispatch();

  const clearFurniture = () => {
    dispatch(furnitureActions.clearFurniture());
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
      <FurnitureList />
      <div className="room-header-sub">
        <div className="room-header-sub-item" onClick={clearFurniture}>
          <img src={Delete} alt="clear"/>
          <div>가구 초기화</div>
        </div>
        <div className="room-header-sub-item">
          <img src={Info} alt="info" />
          <div>방 정보</div>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
