require("dotenv").config();
import axios from "axios";
import { Response } from "express";

const axiosApi = async (category: string, params?: string) => {
  const request = await axios.get(
    `https://api.rawg.io/api/${category}?key=${process.env.API_KEY}${
      params ? params : ""
    }`
  );
  return request.data.results;
};

export default axiosApi;
