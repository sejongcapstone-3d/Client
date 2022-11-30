import React from "react";
import { useState } from "react";
import Furniture from "./Furniture";
import "./FurnitureList.scss";
import LeftArrow from "../../common/icons/left.svg";
import RightArrow from "../../common/icons/right.svg";
import { useEffect } from "react";
import axios from "axios";

const FurnitureList = () => {
  const [page, setPage] = useState(0);
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    getFurnitureList();
  }, []);

  const getFurnitureList = async () => {
    const response = await axios("https://capstone3d.org/furniture");
    const arr = response.data.data.map((e) => {
      return {
        img: e.furniture_img_url,
        path: e.furniture_url,
        name: e.category,
        size: { x: e.furniture_width, y: e.furniture_height, z: e.furniture_depth },
      };
    });
    setFurnitures(arr);
  };

  const prevButtonHandler = () => {
    if (page === 0) return;
    setPage(page - 1);
  };

  const nextButtonHandler = () => {
    if (page === Math.floor(furnitures.length/5)) return;
    setPage(page + 1);
  };

  let furnitureContext;

  if (furnitures.length > 0) {
    furnitureContext = [
      <Furniture
        path={furnitures[5 * page + 0].path}
        img={furnitures[5 * page + 0].img}
        name={furnitures[5 * page + 0].name}
        size={furnitures[5 * page + 0].size}
      />,
      furnitures[5 * page + 1] && (
        <Furniture
          path={furnitures[5 * page + 1].path}
          img={furnitures[5 * page + 1].img}
          name={furnitures[5 * page + 1].name}
          size={furnitures[5 * page + 1].size}
        />
      ),
      furnitures[5 * page + 2] && (
        <Furniture
          path={furnitures[5 * page + 2].path}
          img={furnitures[5 * page + 2].img}
          name={furnitures[5 * page + 2].name}
          size={furnitures[5 * page + 2].size}
        />
      ),
      furnitures[5 * page + 3] && (
        <Furniture
          path={furnitures[5 * page + 3].path}
          img={furnitures[5 * page + 3].img}
          name={furnitures[5 * page + 3].name}
          size={furnitures[5 * page + 3].size}
        />
      ),
      furnitures[5 * page + 4] && (
        <Furniture
          path={furnitures[5 * page + 4].path}
          img={furnitures[5 * page + 4].img}
          name={furnitures[5 * page + 4].name}
          size={furnitures[5 * page + 4].size}
        />
      ),
    ];
  }

  return (
    <div className="furnitures">
      <div className="furnitures-leftbutton" onClick={prevButtonHandler}>
        <img src={LeftArrow} alt="left-arrow" />
      </div>
      {furnitureContext}
      <div className="furnitures-rightbutton" onClick={nextButtonHandler}>
        <img src={RightArrow} alt="right-arrow" />
      </div>
    </div>
  );
};

export default FurnitureList;
