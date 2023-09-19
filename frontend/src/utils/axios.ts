import axios from "axios";

const baseUrl = 'https://gamerlog.onrender.com';

export default axios.create({
  baseURL: baseUrl,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
