import { createSlice } from "@reduxjs/toolkit";

const furnitureSlice = createSlice({
  name: "furnitures",
  initialState: {
    furnitures: [],
    selectedFurniture: null,
    mode: "translate",
    currentId: 1,
    selectedInfo: null,
    furnitureInfo: false
  },
  reducers: {
    select(state, action) {
      state.selectedFurniture = action.payload;
    },
    unmountSelect(state) {
      state.selectedFurniture = null;
    },
    addFurniture(state, action) {
      let count = 1;
      console.log(action.payload.path.slice(0, -6));
      state.furnitures.forEach((e) => {
        if (e.img === action.payload.img) count++;
      });
      if (count > 5) {
        alert("같은가구는 최대 5개까지 배치 가능합니다.");
        return;
      }
      state.furnitures = [
        ...state.furnitures,
        {
          name: action.payload.name,
          path: `${action.payload.path.slice(0, -6)}${count}.json`,
          id: state.currentId,
          img: action.payload.img,
          size: action.payload.size
        }
      ];
      if (state.currentId === 1)
        state.selectedFurniture = {
          name: action.payload.name,
          path: action.payload.path,
          id: state.currentId
        };
      state.currentId += 1;
    },
    clearFurniture(state) {
      state.furnitures = [];
      state.selectedFurniture = null;
      state.currentId = 1;
    },
    chagneModeToTranslate(state) {
      state.mode = "translate";
    },
    changeModeToRotate(state) {
      state.mode = "rotate";
    },
    infoShow(state) {
      state.furnitureInfo = true;
    },
    infoHide(state) {
      state.furnitureInfo = false;
    },
    setInfo(state, action) {
      state.selectedInfo = action.payload;
    }
  }
});

export const furnitureActions = furnitureSlice.actions;
export default furnitureSlice;
