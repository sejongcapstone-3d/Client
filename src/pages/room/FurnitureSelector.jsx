import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./FurnitureSelector.scss";
import { furnitureActions } from "../../redux/furnitureSlice";
import DownArrow from "../../common/icons/down-arrow.svg";
import UpArrow from "../../common/icons/up-arrow.svg";
import classNames from "classnames";

function FurnitureSelector() {
  const furnitures = useSelector((state) => state.furniture.furnitures);
  const selectedFurniture = useSelector((state) => state.furniture.selectedFurniture);
  const [isHide, setIsHide] = useState(false);
  const dispatch = useDispatch();
  if (furnitures.length <= 0) return <div />;
  console.log(furnitures);

  const select = (furniture) => {
    dispatch(furnitureActions.select(furniture));
  };

  const context = furnitures.map((furniture) => {
    return (
      <div
        className={classNames("selector-item", {
          selected: selectedFurniture.id === furniture.id,
        })}
        onClick={() => {
          select(furniture);
        }}
      >
        <img src={furniture.img} alt="furniture" />
        <div className="selector-item-name">{furniture.name}</div>
      </div>
    );
  });
  if (isHide) {
    return (
      <div
        className="selector-show"
        onClick={() => {
          setIsHide(false);
        }}
      >
        <img src={UpArrow} alt="hide" />
      </div>
    );
  } else {
    return (
      <div className="selector">
        <div
          className="selector-hider"
          onClick={() => {
            setIsHide(true);
          }}
        >
          <img src={DownArrow} alt="hide" />
        </div>
        {context}
      </div>
    );
  }
}

export default FurnitureSelector;
