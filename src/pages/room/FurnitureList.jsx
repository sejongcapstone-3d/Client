import React from "react";
import { useState } from "react";
import Furniture from "./Furniture";
import "./FurnitureList.scss";
import LeftArrow from "../../common/icons/left.svg";
import RightArrow from "../../common/icons/right.svg";
import { useEffect } from "react";
import axios from "axios";

const furnitures = [
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    name: "침대1",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/bed/0.json",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/bed/1.json",
    name: "침대2",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/chair/0.json",
    name: "가구3",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구4",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구5",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구6",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구7",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구8",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구9",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구10",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구11",
    size: { x: 132, y: 23, z: 44 },
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: "가구12",
    size: { x: 132, y: 23, z: 44 },
  },
];

const FurnitureList = (props) => {
  const [page, setPage] = useState(0);
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    getFurnitureList();
  }, []);

  const getFurnitureList = async () => {
    const response = await axios("http://3.35.40.132:8080/furniture");
    const arr = response.data.map((e) => {
      return {
        img: e.furniture_img_url,
        path: e.furniture_url,
        name: e.category,
        size: { x: e.furniture_width, y: e.furniture_height, z: e.furniture_depth },
      };
    });
    console.log(arr);
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
  console.log(page);

  if (furnitures.length > 0) {
    furnitureContext = [
      <Furniture
        path={furnitures[5 * page + 0].path}
        img={furnitures[5 * page + 0].img}
        name={furnitures[5 * page + 0].name}
        size={furnitures[5 * page + 0].size}
        addFurniture={props.addFurniture}
      />,
      furnitures[5 * page + 1] && (
        <Furniture
          path={furnitures[5 * page + 1].path}
          img={furnitures[5 * page + 1].img}
          name={furnitures[5 * page + 1].name}
          size={furnitures[5 * page + 1].size}
          addFurniture={props.addFurniture}
        />
      ),
      furnitures[5 * page + 2] && (
        <Furniture
          path={furnitures[5 * page + 2].path}
          img={furnitures[5 * page + 2].img}
          name={furnitures[5 * page + 2].name}
          size={furnitures[5 * page + 2].size}
          addFurniture={props.addFurniture}
        />
      ),
      furnitures[5 * page + 3] && (
        <Furniture
          path={furnitures[5 * page + 3].path}
          img={furnitures[5 * page + 3].img}
          name={furnitures[5 * page + 3].name}
          size={furnitures[5 * page + 3].size}
          addFurniture={props.addFurniture}
        />
      ),
      furnitures[5 * page + 4] && (
        <Furniture
          path={furnitures[5 * page + 4].path}
          img={furnitures[5 * page + 4].img}
          name={furnitures[5 * page + 4].name}
          size={furnitures[5 * page + 4].size}
          addFurniture={props.addFurniture}
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
