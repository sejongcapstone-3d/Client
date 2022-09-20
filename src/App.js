import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./pages/map/Map";
import Room from "./pages/room/Room";
import Home from "./pages/home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<Map />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
