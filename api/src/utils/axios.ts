require("dotenv").config();
import axios from "axios";
import { Response } from "express";

const axiosApi = async (category: string, res: Response, params?: string) => {
  try {
    const request = await axios.get(
      `https://api.rawg.io/api/${category}?key=${process.env.API_KEY}${
        params ? params : ""
      }`
    );
    res.status(200).json(request.data.results);
  } catch (err) {
    res.sendStatus(401);
  }
};

export default axiosApi;
