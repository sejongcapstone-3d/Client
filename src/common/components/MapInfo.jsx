import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import useOnclickOutside from "react-cool-onclickoutside";
import "./MapInfo.scss";
import Info from "../icons/info.svg";
import Phone from "../icons/phone.svg";
import Location from "../icons/location.svg";
import BackArrow from "../icons/back-arrow.svg";
import RightArrow from "../icons/right-arrow.svg";

function MapInfo(props) {
  const ref = useOnclickOutside(() => {
    props.exit();
  });
  const navigate = useNavigate();

  const navButtonHandler = () => {
    navigate("/room/1", {
      state: {
        name: props.name,
        phone: props.phone,
        address: props.location,
        photo: props.img,
        producer: props.producer,
        roomUrl: props.url,
        roomEmptyUrl: props.emptyUrl,
      },
    });
  };

  const exitButtonHandler = () => {
    props.exit();
  };

  return (
    <div ref={ref} className="mapInfo">
      <div className="mapInfo-exit" onClick={exitButtonHandler}>
        <img src={BackArrow} alt="back-arrow" />
      </div>
      <img
        className="mapInfo-image"
        src={
          props.img ||
          "https://happydorm.sejong.ac.kr/resources/images/20/con_img2020_01.jpg"
        }
        alt="placeImage"
      />
      <div className="mapInfo-main">
        <div className="mapInfo-main-name">{props.name || "세종대학교"}</div>
        <div onClick={navButtonHandler} className="mapInfo-main-button">
          3D View
          <img className="mapInfo-main-icon" src={RightArrow} alt="arrow" />
        </div>
      </div>
      <div className="mapInfo-info">
        <img className="mapInfo-info-icon" src={Location} alt="location" />
        <label className="mapInfo-info-label">
          {props.location || "서울특별시 광진구 능동로 209 세종대학교"}
        </label>
      </div>
      <div className="mapInfo-info">
        <img className="mapInfo-info-icon" src={Phone} alt="phone" />
        <label className="mapInfo-info-label">{props.phone || "02-3408-3114"}</label>
      </div>
      <div className="mapInfo-info">
        <img className="mapInfo-info-icon" src={Info} alt="producer" />
        <label className="mapInfo-info-label">{props.producer || "세종대학교"}</label>
      </div>
    </div>
  );
}

export default MapInfo;
