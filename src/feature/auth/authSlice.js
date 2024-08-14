import { removeFromStorage, setToStorage } from "@/utils/utils";
import { createSlice } from "@reduxjs/toolkit";
import { statusCode } from "@/utils/constant";
import {
  registerUserAndLogin,
  requestOtp,
  validateOtpAndLogin,
} from "./authAPI";
import setAuthToken from "@/utils/setAuthToken";

const initialState = {
  email: null,
  hash: null,
  user: null,
  token: null,
  state: "idle",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmailOtpSent: (state, action) => {
      state.email = action.payload.email;
      state.hash = action.payload.hash;
      setToStorage("otpEmail", action.payload);
    },
    removeEmailOtpSent: (state, action) => {
      state.email = null;
      state.hash = null;
      removeFromStorage("otpEmail");
    },
    logoutUser: (state, action) => {
      removeFromStorage("partner_token");
      removeFromStorage("partner_user");
      removeFromStorage("cartDetails");
      removeFromStorage("otpEmail");
      state.user = null;
      state.token = null;
    },
    saveCurrentUser: (state, action) => {
      state.user = action.payload;
    },
    saveCurrentToken: (state, action) => {
      state.token = action.payload;
      setAuthToken(action.payload);
    },
  },
  extraReducers: (builder) => {
    generateExtraReducers(requestOtp)(builder);
    generateExtraReducers(validateOtpAndLogin)(builder);
    generateExtraReducers(registerUserAndLogin)(builder);
  },
});

const generateExtraReducers = (apiAction) => (builder) => {
  builder
    .addCase(apiAction.pending, (state, action) => {
      state.state = statusCode.LOADING;
    })
    .addCase(apiAction.rejected, (state, action) => {
      state.state = statusCode.ERROR;
    })
    .addCase(apiAction.fulfilled, (state, action) => {
      let payload = action.payload;
      if (Array.isArray(action.payload)) {
        payload = action.payload[1];
      }
      state.state = statusCode.IDEAL;
      state.user = payload.user;
      state.token = payload.token;
      setToStorage("partner_token", payload.token);
      setToStorage("partner_user", payload.user);
      setAuthToken(payload.token);
    });
};

export default authSlice.reducer;
export const {
  setEmailOtpSent,
  removeEmailOtpSent,
  logoutUser,
  saveCurrentToken,
  saveCurrentUser,
} = authSlice.actions;
