require("dotenv").config();
import axios from "axios";

export const apiGamesAxios = axios.create({
  baseURL: `https://api.rawg.io/api/games?key=${process.env.API_KEY}`,
});
