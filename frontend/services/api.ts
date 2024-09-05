import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://103.196.153.135",
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error);
  }
);


