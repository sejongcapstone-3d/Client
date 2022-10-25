import React from "react";
import { useSelector } from "react-redux";
import "./FurnitureSelector.scss";

function FurnitureSelector() {
  const furnitures = useSelector((state) => state.furnitures);
  if (furnitures.length <= 0) return <div />;
  console.log(furnitures);
  const context = furnitures.map((furniture)=>{
    return <div className="selector-item">
      <img src="http://woodolens.com/morenvyimg/220922_pc_new01.jpg" alt="furniture"/>
      <div className="selector-item-name">{furniture.name}</div>
    </div>
  })
  return <div className="selector">{context}</div>;
}

export default FurnitureSelector;
