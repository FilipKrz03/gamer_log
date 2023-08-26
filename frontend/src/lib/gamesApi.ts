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

export const getSearchedGames = async (searchParams: string) => {
  const res = await axios.get(searchParams);
  const games = res.data.games;
  return games;
};

export const getSpecificGame = async (id: number) => {
  const res = await axios.get(`/search/${id}`);
  if (res.status !== 200) throw new Error("Failed to fetch data");
  return res.data;
};
