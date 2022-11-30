import React from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import MapInfo from "./MapInfo";
import { useState } from "react";
import { key } from "./key.js";
import "./GoogleMap.scss";
import PlacesAutocomplete from "./PlacesAutoComplete";
import { useEffect } from "react";
import CurrentLocation from "../../common/icons/user-location.svg";
import { useDispatch, useSelector } from "react-redux";
import Camera from "../icons/camera.svg";
import imageCompression from "browser-image-compression";
import { uploadRoom } from "../../api/room";
import PTS from "../icons/3d.svg";

const defaultProps = {
  center: {
    lat: 37.55331,
    lng: 127.07268,
  },
  zoom: 11,
};
const containerStyle = {
  width: "43vw",
  height: "90vh",
  borderRadius: "5px",
};

function GoogleMapForUpload() {
  const user = useSelector((state) => state.user);
  const accessToken = window.localStorage.getItem("accessToken");
  const refreshToken = window.localStorage.getItem("refreshToken");
  const [image, setImage] = useState();
  const [pts, setPts] = useState();
  const [sendingImage, setSendingImage] = useState();
  const [ptsName, setPtsName] = useState("");
  const [userLocation, setUserLocation] = useState();
  const [enteredInput, setEnteredInput] = useState({
    name: "",
    address: "",
    lat: "",
    lng: "",
  });
  const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
  const [marker, setMarker] = useState(
    <Marker
      title="위치"
      zIndex={9999}
      position={{ lat: 37.552848352703556, lng: 127.07506747739092 }}
    />
  );

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords.latitude);
      setUserLocation({ lat: coords.latitude, lng: coords.longitude });
    });
  }, []);

  useEffect(() => {
    const temp = (
      <Marker
        title="위치"
        zIndex={9999}
        position={{ lat: latLng.lat, lng: latLng.lng }}
      />
    );
    console.log(latLng.lat, latLng.lng);
    setMarker(temp);
    const google = window.google;
    const geocoder = new google.maps.Geocoder();
    if (latLng.lat > 0 && latLng.lng > 0) {
      geocoder.geocode({ location: latLng }, (results, status) => {
        setEnteredInput((prev) => {
          return { ...prev, address: results[0].formatted_address.slice(5) || "" };
        });
      });
    }
  }, [latLng]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  const mapOptions = {
    disableDefaultUI: true,
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    map.disableDefaultUI = true;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const selectAutoCompletePlace = (lat, lng) => {
    map.setCenter({ lat, lng });
  };

  const currentLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.panTo({ lat: coords.latitude, lng: coords.longitude });
    });
  };

  const mapClickHandler = (e) => {
    console.log(e);
    setEnteredInput((prev) => {
      return {
        ...prev,
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      };
    });
    setLatLng({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };

  const handleImage = async (e) => {
    const reader = new FileReader();
    reader.onload = function () {
      setImage(reader.result);
    };
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(e.target.files[0], options);
    reader.readAsDataURL(compressedFile);
    reader.onloadend = () => {
      const base64data = reader.result;
      setSendingImage(base64data);
    };
  };

  const handlingDataForm = async (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);

    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ia], {
      type: "image/jpeg",
    });
    const file = new File([blob], "image.jpg");

    const formData = new FormData();
    formData.append("img", file);

    return formData;
  };

  const submitHandler = async () => {
    const formData = await handlingDataForm(sendingImage);
    formData.append("userId", user.userId);
    formData.append("title", enteredInput.name);
    formData.append("file", pts);
    formData.append("address", enteredInput.address);
    formData.append("lat", enteredInput.lat);
    formData.append("lng", enteredInput.lng);
    await uploadRoom(formData, accessToken, (response) => {
      console.log(response);
    });
  };

  const setPtsFile = (e) => {
    setPts(e.target.files[0]);
    setPtsName(e.target.value.slice(12,));
  };

  console.log(ptsName);

  if (!isLoaded) return <></>;
  return (
    <div className="upload">
      <div className="upload-info">
        <div className="upload-info-photo">
          <label htmlFor="image" className="upload-info-photo-label">
            <input
              type="file"
              accept="image/jpeg,image/gif,image/png;capture=filesystem"
              name="image"
              value={null}
              id="image"
              autoComplete="off"
              className="upload-info-photo"
              onChange={handleImage}
            />
            <img src={Camera} className="upload-info-photo-icon" />
          </label>
          <div
            className="upload-info-photo-preview"
            style={{ backgroundImage: `url(${image})` }}
          />
          <label htmlFor="pts" className="upload-info-pts-label">
            <input
              type="file"
              name="pts"
              id="pts"
              autoComplete="off"
              onChange={setPtsFile}
            />
            <img src={PTS} alt="3d" />
          </label>
        </div>
        <div className="upload-info-input">
          <input
            value={ptsName}
            className="upload-info-pts"
            placeholder=".pts 파일"
          />
        </div>
        <div className="upload-info-input">
          <input
            className="upload-info-name"
            value={enteredInput.name}
            onChange={(e) => {
              setEnteredInput((prev) => {
                return { ...prev, name: e.target.value };
              });
            }}
            placeholder="방 이름"
          />
        </div>
        <div className="upload-info-input">
          <input
            value={enteredInput.address}
            className="upload-info-address"
            placeholder="주소"
          />
        </div>
        <div className="upload-info-latlng">
          <input
            value={latLng.lat}
            className="upload-info-latlng-lat"
            placeholder="위도"
          />
          <input
            value={latLng.lng}
            className="upload-info-latlng-lng"
            placeholder="경도"
          />
        </div>
        <div className="upload-user">
          <div className="upload-user-info">
            <div className="upload-info-user">
              판매자 <span>{user.nickName}</span>
            </div>
            <div className="upload-info-user">
              판매자 번호 <span>{user.phone}</span>
            </div>
            <div className="upload-info-user">
              상호명 <span>{user.businessName}</span>
            </div>
          </div>
        </div>
        <div className="upload-info-submit" onClick={submitHandler}>
          등록
        </div>
      </div>
      <div className="upload-map">
        <div className="upload-map-userLocation" onClick={currentLocationHandler}>
          <img src={CurrentLocation} alt="user-location" />
        </div>
        <div>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={userLocation || defaultProps.center}
            clickableIcons={false}
            zoom={16}
            options={mapOptions}
            onLoad={onLoad}
            onUnmount={onUnmount}
            onClick={mapClickHandler}
          >
            <div className="searchbar">
              <PlacesAutocomplete
                placeholder="원하는 지역에 방 등록하기"
                className="searchbar"
                select={selectAutoCompletePlace}
              />
            </div>
            {marker}
          </GoogleMap>
        </div>
      </div>
    </div>
  );
}

export default GoogleMapForUpload;
