import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("userEmail"), // Check if user is logged in
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userEmail");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
