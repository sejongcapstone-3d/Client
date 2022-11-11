import { combineReducers, configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./furnitureSlice";
import roomSlice from "./roomSlice";

const reducer = combineReducers({
  furniture: furnitureSlice,
  room: roomSlice
})

const store = configureStore({
  reducer: {
    furniture: furnitureSlice.reducer,
    room: roomSlice.reducer
  }
})

export default store;