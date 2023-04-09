import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  nickName: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, action) => ({
      ...state,
      userId: action.payload.userId,
      nickName: action.payload.nickName,
    }),
    authStateChange: (state, action) => ({
      ...state,
      stateChange: action.payload,
    }),
  },
});

export const authActions = authSlice.actions;
