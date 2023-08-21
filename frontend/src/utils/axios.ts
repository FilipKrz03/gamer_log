import axios from "axios";

const baseUrl = "http://localhost:3500"

export default axios.create({
  baseURL: baseUrl,
});
