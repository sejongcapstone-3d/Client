import React from "react";
import {
  GoogleMap,
  Animation,
  LoadScript,
  StandaloneSearchBox,
  Marker,
  useJsApiLoader,
  InfoWindow,
  Autocomplete,
} from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import MapInfo from "./MapInfo";
import { useRef } from "react";
import { useState } from "react";
import { key } from "./key.js";
import "./GoogleMap.scss";
import PlacesAutocomplete from "./PlacesAutoComplete";
import { useEffect } from "react";
import CurrentLocation from "../../common/icons/user-location.svg";
import axios from "axios";
import { getRoomDatas } from "../../api/room";
import { useDispatch } from "react-redux";

const defaultProps = {
  center: {
    lat: 37.55331,
    lng: 127.07268,
  },
  zoom: 11,
};
const containerStyle = {
  width: "100vw",
  height: "100vh",
};

function GoogleMapComponent() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState();
  const [enteredInput, setEnteredInput] = useState("");
  const [userLocation, setUserLocation] = useState();
  const [roomList, setRoomList] = useState([]);
  const [markerList, setMarkerList] = useState([]);
  const inputRef = useRef();
  const dispatch = useDispatch();
  let field;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords.latitude);
      setUserLocation({ lat: coords.latitude, lng: coords.longitude });
    });
    getRoomData();
  }, []);

  const getRoomData = () => {
    getRoomDatas((response) => {
      setRoomList(response.data);
      console.log(response);
    }, dispatch);
  };

  useEffect(() => {
    const markers = roomList.map((e) => {
      return (
        <Marker
          zIndex={9999}
          title={e.room.name}
          position={{
            lat: e.lat,
            lng: e.lon,
          }}
          onClick={() => {
            onClickHandler(e);
          }}
        />
      );
    });
    setMarkerList(markers);
  }, [roomList]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: key,
  });

  const exitButtonHandler = () => {
    setIsSelected(false);
  };

  const mapOptions = {
    disableDefaultUI: true,
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(defaultProps.center);
    // map.fitBounds(bounds);
    setMap(map);
    map.disableDefaultUI = true;
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onClickHandler = (e) => {
    setIsSelected(true);
    setSelectedRoom({
      name: e.room.name,
      img: e.room.room_img_url,
      url: e.room.full_room_url,
      emptyUrl: e.room.empty_room_url,
      location: "",
      phone: e.phone,
      producer: e.business_name,
    });
  };

  const selectAutoCompletePlace = (lat, lng) => {
    map.setCenter({ lat, lng });
  };

  const currentLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.panTo({ lat: coords.latitude, lng: coords.longitude });
    });
  };

  if (!isLoaded) return <></>;

  return (
    <div>
      {isSelected && (
        <MapInfo
          name={selectedRoom.name}
          phone={selectedRoom.phone}
          location={selectedRoom.location}
          url={selectedRoom.url}
          emptyUrl={selectedRoom.emptyUrl}
          img={selectedRoom.img}
          producer={selectedRoom.producer}
          exit={exitButtonHandler}
        />
      )}
      <div className="userLocation" onClick={currentLocationHandler}>
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
        >
          <div className="searchbar">
            <PlacesAutocomplete className="searchbar" select={selectAutoCompletePlace} />
          </div>
          {markerList}
        </GoogleMap>
      </div>
    </div>
  );
}

export default GoogleMapComponent;
