import axios from "axios";
import api from "./axios";

export const signupUser = async (data) => {
  try {
    const res = await api.post("/user/signup", data);
    return res.data;
  } catch (err) {
    console.log("axiosError", err);
  }
};

export const loginUser = async (data) => {
  try {
    const res = await api.post("user/login", data);
    return res.data;
  } catch (err) {
    console.log("axoisError", err);
  }
};
