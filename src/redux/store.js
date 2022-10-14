import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./furnitureSlice";

const store = configureStore({
  reducer: furnitureSlice.reducer
})

export default store;