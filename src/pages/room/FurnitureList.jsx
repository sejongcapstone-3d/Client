import React from "react";
import { useState } from "react";
import Furniture from "./Furniture";
import "./FurnitureList.scss";

const furnitures = [
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    name: '침대1',
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/bed/0.json",
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/bed/1.json",
    name: '침대2',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/chair/0.json",
    name: '가구3',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구4',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구5',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구6',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구7',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구8',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구9',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구10',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구11',
  },
  {
    img: "http://woodolens.com/morenvyimg/220922_pc_new01.jpg",
    path: "https://3d-rooms.s3.ap-northeast-2.amazonaws.com/furniture/closet/0copy.json",
    name: '가구12',
  },
];

const FurnitureList = (props) => {
  const [page, setPage] = useState(0);

  const prevButtonHandler = () => {
    if(page === 0)
      return;
    setPage(page-1);
  };

  const nextButtonHandler = () => {
    if(page === 2)
      return;
    setPage(page+1);
  };

  const furnitureContext = [
    <Furniture path={furnitures[5*page+0].path} img={furnitures[5*page+0].img} name={furnitures[5*page+0].name} addFurniture={props.addFurniture}/>,
    (furnitures[5*page+1] && <Furniture path={furnitures[5*page+1].path} img={furnitures[5*page+1].img} name={furnitures[5*page+1].name} addFurniture={props.addFurniture}/>),
    (furnitures[5*page+2] && <Furniture path={furnitures[5*page+2].path} img={furnitures[5*page+2].img} name={furnitures[5*page+2].name} addFurniture={props.addFurniture}/>),
    (furnitures[5*page+3] && <Furniture path={furnitures[5*page+3].path} img={furnitures[5*page+3].img} name={furnitures[5*page+3].name} addFurniture={props.addFurniture}/>),
    (furnitures[5*page+4] && <Furniture path={furnitures[5*page+4].path} img={furnitures[5*page+4].img} name={furnitures[5*page+4].name} addFurniture={props.addFurniture}/>),
  ];

  console.log(page);

  return <div className="furnitures">
    <div onClick={prevButtonHandler}>left</div>
    {furnitureContext}
    <div onClick={nextButtonHandler}>right</div>
  </div>;
};

export default FurnitureList;
