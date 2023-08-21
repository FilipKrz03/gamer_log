import axios from "@/utils/axios";

export const getGenres = async () => {
  const genres = await axios.get("/genres");
  return genres;
};
