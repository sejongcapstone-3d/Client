import React from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, useJsApiLoader, InfoWindow, Autocomplete } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import MapInfo from "./MapInfo";
import { useRef } from "react";
import { useState } from "react";
import { key } from "./key.js";
import "./GoogleMap.scss";
import PlacesAutocomplete from "./PlacesAutoComplete";

const defaultProps = {
  center: {
    lat: 37.553310,
    lng: 127.072680
  },
  zoom: 11
}
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

function GoogleMapComponent() {
  const [isSelected, setIsSelected] = useState(false);
  const inputRef = useRef();
  let field;
  const [enteredInput, setEnteredInput] = useState('');
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const exitButtonHandler = () => {
    setIsSelected(false);
  };

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(defaultProps.center);
    // map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onClickHandler = (e) => {
    console.log(e.domEvent.target.title);
    console.log(e);
    setIsSelected(true);
  };

  const searchButtonClickHandler = () => {
    console.log(inputRef.current.value);
    console.log(field);
    map.setCenter(inputRef.current.value);
  };

  const selectAutoCompletePlace = (lat,lng) => {
    map.setCenter({lat,lng});
  };

  if (!isLoaded) return <></>

  return <div>
    {isSelected && <MapInfo exit={exitButtonHandler}/>}
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultProps.center}
        zoom={16}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <div className="searchbar">
          <PlacesAutocomplete select={selectAutoCompletePlace}/>
          {/* <Autocomplete onPlaceChanged={(e)=>{console.log(e)}} fields={field} >
            <input
              type="text"
              className="serachbar-input"
              ref={inputRef}
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                left: "50%",
                marginLeft: "-120px"
              }}
            />
          </Autocomplete> */}
        </div>
        <Marker zIndex={9999} onLoad={() => { console.log(1) }} title="세종대학교" position={defaultProps.center} onClick={onClickHandler} />
        {/* <LoadScript>
        <StandaloneSearchBox onPlacesChanged={() => { console.log(1) }}>
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              marginLeft: "-120px"
            }}
          />
        </StandaloneSearchBox>
        </LoadScript> */}
        { /* Child components, such as markers, info windows, etc. */}
        <></>
      </GoogleMap>
    </div>
  </div>
}

export default GoogleMapComponent;