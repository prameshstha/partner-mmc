import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/feature/auth/authSlice";

export const store = configureStore({
  reducer: { authStore: authReducer },
});
