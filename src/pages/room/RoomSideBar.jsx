import React, { useState } from "react";
import Chair from "../../common/icons/chair.svg";
import Mouse from "../../common/icons/mouse.svg";
import "./RoomSideBar.scss";
import BlueMouse from "../../common/icons/mouse-blue.svg";
import BlueChair from "../../common/icons/chair-blue.svg";
import classNames from "classnames";

const RoomSideBar = (props) => {
  const [selected, setSelected] = useState("mouse");

  return (
    <div className="sidebar">
      <div onClick={props.delete}>삭제</div>
      <div
        className={classNames("sidebar-item", { selected: selected === "mouse" })}
        onClick={() => {
          setSelected("mouse");
          props.orbit();
        }}
      >
        <img src={selected === "mouse" ? BlueMouse : Mouse} alt="mouse" />
      </div>
      <div
        className={classNames("sidebar-item", { selected: selected === "chair" })}
        onClick={() => {
          setSelected("chair");
          props.drag();
        }}
      >
        <img src={selected === "chair" ? BlueChair : Chair} alt="furniture" />
      </div>
    </div>
  );
};

export default RoomSideBar;
