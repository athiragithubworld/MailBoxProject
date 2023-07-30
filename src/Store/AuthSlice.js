import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: !localStorage.getItem("emailObj")
    ? null
    : JSON.parse(localStorage.getItem("emailObj")).token,
  email: !localStorage.getItem("emailObj")
    ? null
    : JSON.parse(localStorage.getItem("emailObj")).email,
  isLoggedIn: !localStorage.getItem("emailObj") ? false : true,
};

const Authslice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = true;
      const emailObj = {
        token: action.payload.token,
        email: action.payload.email,
        isLoggedIn: true,
      };
      localStorage.setItem("emailObj", JSON.stringify(emailObj));
    },
    logout(state) {
      state.token = null;
      state.email = null;
      state.isLoggedIn = false;
      localStorage.removeItem("emailObj");
    },
  },
});

export const authActions = Authslice.actions;

export default Authslice.reducer;
