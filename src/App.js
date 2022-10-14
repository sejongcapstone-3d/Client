import React from "react";
import {Provider} from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./pages/map/Map";
import Room from "./pages/room/Room";
import Home from "./pages/home/Home";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
    </Provider>
  );
}

export default App;
