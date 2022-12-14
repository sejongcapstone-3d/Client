import React, { useState } from "react";
import "./RoomHeader.scss";
import { useNavigate } from "react-router-dom";
import FillRoom from "../../common/icons/fill-room.svg";
import EmptyRoom from "../../common/icons/empty-room.svg";
import Furniture from "./Furniture";
import FurnitureList from "./FurnitureList";
import TopArrow from "../../common/icons/top-arrow.svg";
import Delete from "../../common/icons/delete.svg";
import Info from "../../common/icons/map.svg";
import { furnitureActions } from "../../redux/furnitureSlice";
import { useDispatch } from "react-redux";

const RoomHeader = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(props.isEmpty);

  const clearFurniture = () => {
    dispatch(furnitureActions.clearFurniture());
    dispatch(furnitureActions.infoHide());
  };

  const emptyButtonClickHandler = () => {
    if (isEmpty) {
      props.toOrigin();
    } else {
      props.toEmpty();
    }
    setIsEmpty(!isEmpty);
  };

  return (
    <div className="room-header">
      <div className="room-header-main" onClick={emptyButtonClickHandler}>
        {isEmpty ? "원래대로" : "빈방보기"}
      </div>
      <FurnitureList />
      <div className="room-header-sub">
        <div className="room-header-sub-item" onClick={clearFurniture}>
          <img src={Delete} alt="clear" />
          <div>가구 초기화</div>
        </div>
        <div
          className="room-header-sub-item"
          aria-hidden="true"
          onClick={() => {
            navigate("/map");
            clearFurniture();
          }}>
          <img src={Info} alt="clear" />
          <div>지도로 돌아가기</div>
        </div>
      </div>
    </div>
  );
};

export default RoomHeader;
