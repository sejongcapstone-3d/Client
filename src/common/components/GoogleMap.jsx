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
  const [enteredInput, setEnteredInput] = useState("");
  const [userLocation, setUserLocation] = useState();
  const inputRef = useRef();
  let field;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords.latitude);
      setUserLocation({lat:coords.latitude, lng:coords.longitude});
    });
  }, []);

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
    console.log(e.domEvent.target.title);
    console.log(e);
    setIsSelected(true);
  };

  const selectAutoCompletePlace = (lat, lng) => {
    map.setCenter({ lat, lng });
  };

  const currentLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      map.panTo({lat:coords.latitude, lng:coords.longitude});
    });
  };

  if (!isLoaded) return <></>;

  return (
    <div>
      {isSelected && <MapInfo exit={exitButtonHandler} />}
      <div className="userLocation" onClick={currentLocationHandler}>
        <img src={CurrentLocation} alt="user-location"/>
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
          <Marker
            zIndex={9999}
            title="세종대학교"
            position={defaultProps.center}
            onClick={onClickHandler}
          />
        </GoogleMap>
      </div>
    </div>
  );
}

export default GoogleMapComponent;
