import React from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox, Marker, useJsApiLoader, InfoWindow, Autocomplete } from "@react-google-maps/api";
import { Link, useNavigate } from "react-router-dom";
import MapInfo from "./MapInfo";
import { useRef } from "react";
import { useState } from "react";
import {key} from "./key.js";

const defaultProps = {
  center: {
    lat: 36.6855424,
    lng: 126.323213
  },
  zoom: 11
}
const containerStyle = {
  width: '100vw',
  height: '100vh'
};

function GoogleMapComponent() {
  const inputRef = useRef();
  const [enteredInput, setEnteredInput] = useState('');
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: key
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(defaultProps.center);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const onClickHandler = (e) => {
    console.log(e.domEvent.target.title);
  };

  if (!isLoaded) return <></>

  return <div>
    {/* <MapInfo /> */}
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultProps.center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Autocomplete >
        <input
              type="text"
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
                position: "absolute",
                left: "50%",
                marginLeft: "-120px"
              }}
            />
        </Autocomplete>
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