import axios from "axios";

const API = axios.create({
  baseURL: "https://d32neyt9p9wyaf.cloudfront.net/api/v3",
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;

// API CALLS

export const sendOTP = (mobile) => API.post("/otp-send", { mobile });

export const loginUser = (mobile) => API.post("/login", { mobile });

export const registerUser = (data) =>
  API.post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const fetchProfile = (userId) => API.post(`/post-details?user_id=${userId}`);
