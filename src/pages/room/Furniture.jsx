import React from "react";
import { useDispatch } from "react-redux";
import "./Furniture.scss";
import { furnitureActions } from "../../redux/furnitureSlice";

const Furniture = (props) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    console.log(props.name, props.path);
    dispatch(furnitureActions.addFurniture({
      name: props.name,
      path: props.path
    }))
  };
  return (
    <div className="furniture" onClick={clickHandler}>
      <img src={props.img} alt="furniture" />
      <div className="furniture-name">{props.name}</div>
    </div>
  );
};

export default Furniture;
