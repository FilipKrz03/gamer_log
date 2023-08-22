import axios from "@/utils/axios";

export const getGenres = async () => {
  const res = await axios.get("/genres");
  if (res.status !== 200) throw new Error("Failed to fetch data");
  const genres = res.data.genres;
  return genres;
};

export const getPlafroms = async () => {
  const res = await axios.get("/platforms");
  if (res.status !== 200) throw new Error("Failed to fetch data");
  const platforms = res.data.plafroms;
  return platforms;
};

export const getSearchedGames = async (searchPramas: string) => {
  const res = await axios.post(`/games/${searchPramas}`, searchPramas);
  if (res.status !== 200) throw new Error("Failed to fetch data");
  const games = res.data.games;
  return games;
};
