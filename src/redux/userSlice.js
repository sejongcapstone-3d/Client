import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: 0,
  isSignIn: false,
  nickName: '',
  phone: '',
  businessName: ''
}

const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    signIn(state, action){
      return action.payload;
    },
    signOut(state){
      state = initialState;
    }
  } 
});

export const userActions = userSlice.actions;
export default userSlice;
