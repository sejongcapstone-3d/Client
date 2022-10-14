import { createSlice } from "@reduxjs/toolkit";

const furnitureSlice = createSlice({
  name: "furnitures",
  initialState: {
    furnitures: [],
    selectedFurniture: null,
    mode: "translate",
    currentId: 1,
  },
  reducers: {
    select(state, action) {
      state.selectedFurniture = action.payload;
    },
    unmountSelect(state) {
      state.selectedFurniture = null;
    },
    addFurniture(state, action) {
      console.log(action.payload);
      console.log(state.furnitures);
      state.furnitures = [...state.furnitures,
        { name: action.payload.name, path: action.payload.path, id: state.currentId },
      ];
      state.currentId += 1;
    },
    clearFurniture(state) {
      state.furnitures = [];
      state.currentId = 1;
    },
    chagneModeToTranslate(state) {
      state.mode = "translate";
    },
    changeModeToRotate(state) {
      state.mode = "rotate";
    },
  },
});

export const furnitureActions = furnitureSlice.actions;
export default furnitureSlice;
