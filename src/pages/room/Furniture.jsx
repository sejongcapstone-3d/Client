import React from "react";
import { useDispatch } from "react-redux";
import "./Furniture.scss";
import { furnitureActions } from "../../redux/furnitureSlice";

const Furniture = (props) => {
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(furnitureActions.infoShow());
    dispatch(
      furnitureActions.setInfo({
        name: props.name,
        path: props.path,
        size: props.size,
        img: props.img,
      })
    );
  };
  return (
    <div className="furniture" onClick={clickHandler}>
      <img src={props.img} alt="furniture" />
      <div className="furniture-name">{props.name}</div>
    </div>
  );
};

export default Furniture;
