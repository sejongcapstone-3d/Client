import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name:'',
  address:'',
  phone:'',
  photo:'',
  producer:'',
  roomUrl: '',
  roomEmptyUrl: ''
}

const roomSlice = createSlice({
  name:'room',
  initialState,
  reducers: {
    setRoom(state, action){
      state = action.payload;
    },
    initRoom(state){
      state = initialState;
    }
  } 
});

export const roomActions = roomSlice.actions;
export default roomSlice;
