import React from "react";
import "./Furniture.scss";

const Furniture = (props) => {
  const clickHandler = () => {
    props.addFurniture(props.path, 'translate', true);
  };
  return (
    <div className="furniture" onClick={clickHandler}>
      <img src={props.img} alt="furniture" />
      <div className="furniture-name">{props.name}</div>
    </div>
  );
};

export default Furniture;
