require("dotenv").config();
import axios from "axios";

const axiosApi = async (category: string, params?: string , onlyResults:boolean = true) => {
  const request = await axios.get(
    `https://api.rawg.io/api/${category}?key=${process.env.API_KEY}${
      params ? params : ""
    }`
  );
  if (onlyResults === true) return request.data.results;
  else return request.data;
};

export default axiosApi;
