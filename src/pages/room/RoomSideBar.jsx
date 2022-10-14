import React, { useState } from "react";
import Mouse from "../../common/icons/mouse.svg";
import "./RoomSideBar.scss";
import BlueMouse from "../../common/icons/mouse-blue.svg";
import Rotate from "../../common/icons/rotate.svg";
import BlueRotate from "../../common/icons/rotate-blue.svg";
import classNames from "classnames";
import { useDispatch } from "react-redux";
import { furnitureActions } from "../../redux/furnitureSlice";

const RoomSideBar = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("mouse");

  return (
    <div className="sidebar">
      <div
        className={classNames("sidebar-item", { selected: selected === "mouse" })}
        onClick={() => {
          dispatch(furnitureActions.chagneModeToTranslate())
        }}
      >
        <img src={selected === "mouse" ? BlueMouse : Mouse} alt="mouse" />
      </div>
      <div
        className={classNames("sidebar-item", { selected: selected === "chair" })}
        onClick={() => {
          dispatch(furnitureActions.changeModeToRotate())
        }}
      >
        <img src={selected === "chair" ? BlueRotate : Rotate} alt="furniture" />
      </div>
    </div>
  );
};

export default RoomSideBar;
