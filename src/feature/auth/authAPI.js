import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

export const requestOtp = createAsyncThunk("request-otp/post", async (data) => {
  try {
    const response = await axios({
      method: "post",
      url: "/partner/otp-email",
      data: data,
    });
    return response.data.data;
  } catch (error) {
    if (error.response.status === 422) {
      toast.error(error.response.data.message);
      return false;
    }
    toast.error("Something went wrong! Please try again later!");
    return false;
  }
});

export const validateOtpAndLogin = createAsyncThunk(
  "validate-otp/post",
  async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "/partner/validate-2fa-login",
        data: data,
      });
      return ["login", response.data.data];
    } catch (error) {
      if (error.response.status === 422) {
        if (
          error.response.data.message == "Otp validated but user not found!"
        ) {
          return ["register", error.response.data.data.email];
        }
        toast.error(error.response.data.message);
        return false;
      }
      toast.error("Something went wrong! Please try again!");
      return false;
    }
  }
);

export const registerUserAndLogin = createAsyncThunk(
  "register-otp/post",
  async (data) => {
    try {
      const response = await axios({
        method: "post",
        url: "/partner/register-after-otp",
        data: data,
      });
      return response.data.data;
    } catch (error) {
      if (error.response.status === 422) {
        toast.error(error.response.data.message);
        return false;
      }
      toast.error("Something went wrong! Please try again!");
      return false;
    }
  }
);

export const getReferrer = createAsyncThunk(
  "get-refeerer/get",
  async (data) => {
    try {
      const response = await axios({
        method: "get",
        url: "partner/referral?referral_code=" + data,
      });
      return response.data.data;
    } catch (error) {
      if (error.response.status === 422) {
        toast.error(error.response.data.message);
        return false;
      }
      toast.error("Something went wrong! Please try again!");
      return false;
    }
  }
);
