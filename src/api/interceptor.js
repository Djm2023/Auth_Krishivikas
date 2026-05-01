import axios from "axios";

const AuthFetch = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

AuthFetch.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default AuthFetch;

// These are the endpoints
export const sendOTP = (mobile) => AuthFetch.post("/otp-send", { mobile });

export const loginUser = (mobile) => AuthFetch.post("/login", { mobile });

export const registerUser = (data) => AuthFetch.post("/register", data);

export const fetchProfile = (userId) => AuthFetch.post(`/post-details?user_id=${userId}`);
