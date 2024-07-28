import { configureStore } from "@reduxjs/toolkit";
import flightReducer from "../features/flight/flightSlice";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    flight: flightReducer,
    auth: authReducer,
    user: userReducer,
  },
});
