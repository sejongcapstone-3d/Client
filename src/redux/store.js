import { combineReducers, configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./furnitureSlice";
import roomSlice from "./roomSlice";
import userSlice from "./userSlice";

const reducer = combineReducers({
  furniture: furnitureSlice,
  room: roomSlice,
  user: userSlice,
})

const store = configureStore({
  reducer: {
    furniture: furnitureSlice.reducer,
    room: roomSlice.reducer,
    user: userSlice.reducer,
  }
})

export default store;