import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_ADRESS;

export default axios.create({
  baseURL: baseUrl,
});

export const axiosPrivate = axios.create({
  baseURL: baseUrl,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
