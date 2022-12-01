import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Map from "./pages/map/Map";
import "./App.scss";
import Room from "./pages/room/Room";
import Home from "./pages/home/Home";
import store from "./redux/store";
import SignIn from "./pages/sign/SignIn";
import SignUp from "./pages/sign/SignUp";
import UploadRoom from "./pages/upload/UploadRoom";
import RoomEmpty from "./pages/room/RoomEmpty";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user/signIn" element={<SignIn />} />
          <Route path="/user/signUp" element={<SignUp />} />
          <Route path="/map" element={<Map />} />
          <Route path="/room/:id" element={<Room />} />
          <Route path="/room/empty" element={<RoomEmpty />} />
          <Route path="/user/upload" element={<UploadRoom />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
