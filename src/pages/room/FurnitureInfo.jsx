import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Plus from "../../common/icons/plus.svg";
import { furnitureActions } from "../../redux/furnitureSlice";
import "./FurnitureInfo.scss";
import FurniturePreivew from "./FurniturePreview";
import Exit from "../../common/icons/exit.svg";

function FurnitureInfo() {
  const selected = useSelector((state) => state.selectedInfo);
  const dispatch = useDispatch();
  const addFurniture = () => {
    dispatch(
      furnitureActions.addFurniture({
        name: selected.name,
        path: selected.path,
        size: selected.size,
        img: selected.img,
      })
    );
  };
  
  const closeInfoWindow = () => {
    dispatch(furnitureActions.infoHide());
    dispatch(furnitureActions.setInfo(null));
  }

  if (selected) {
    return (
      <div className="furnitureinfo">
        <div className="furnitureinfo-exit" onClick={closeInfoWindow}>
          <img src={Exit} alt="exit"/>
        </div>
        <div className="furnitureinfo-graphic">
          <img src={selected.img} alt="size-image" />
          <div className="furnitureinfo-size">
          <span>가로 : {selected.size.x}cm</span>
          <span>세로 : {selected.size.y}cm</span>
          <span>높이 : {selected.size.z}cm</span>
        </div>
          {/* <FurniturePreivew path={selected.path}/> */}
          {/* <img src={selected.img} alt="size-image" /> */}
          {/* 3d viewer */}
        </div>
        
        <div className="furnitureinfo-add" onClick={addFurniture}>
          <span>가구 배치</span>
          <img src={Plus} alt="plus" />
        </div>
      </div>
    );
  } else return <div></div>;
}

export default FurnitureInfo;
