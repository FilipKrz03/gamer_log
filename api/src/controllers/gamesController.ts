import { Request, Response } from "express";
import axiosApi from "../utils/axios";
import { Genre, Preferences } from "../utils/types";
import UserGames from "../models/UserGames";
import UserWishes from "../models/UserWishes";
import { IGetUserId } from "../middleware/verifyJWT";

interface IGetUserIdWithPage extends IGetUserId {
  query: {
    page: string;
  };
}

const getAllGames = async (req: Request, res: Response) => {
  const games = await axiosApi("games");
  res.status(200).json({ games });
};

const getGeneres = async (req: Request, res: Response) => {
  const genres: Awaited<Preferences[]> = await axiosApi("genres");
  let genresArray: Preferences[] = [];
  genres.map((tag) => {
    const tagItem = {
      id: tag.id,
      name: tag.name,
    };
    genresArray.push(tagItem);
  });
  res.status(200).json({ genres: genresArray });
};

const getPlafroms = async (req: Request, res: Response) => {
  const plafroms: Awaited<Genre[]> = await axiosApi("platforms");
  let plafromsArray: Genre[] = [];
  plafroms.map((platform) => {
    const platformIitem = {
      id: platform.id,
      name: platform.name,
    };
    plafromsArray.push(platformIitem);
    plafromsArray = plafromsArray.slice(0, 15);
  });
  res.status(200).json({ plafroms: plafromsArray });
};
const getTags = async (req: Request, res: Response) => {
  const tags: Awaited<Preferences[]> = await axiosApi("tags", "&page_size=25");
  let tagsArray: Preferences[] = [];
  tags.map((tag) => {
    const genreIitem = {
      id: tag.id,
      name: tag.name,
    };
    tagsArray.push(genreIitem);
  });
  res.status(200).json({ tags: tagsArray });
};

const getSearchedGames = async (req: Request, res: Response) => {
  const { search, genres, platforms, tags, page } = req.query;
  const url = `${search ? "&search=" + search : ""}${
    genres ? "&genres=" + genres : ""
  }${platforms ? "&platforms=" + platforms : ""}${
    tags ? "&tags=" + tags : ""
  }&page=${page}&page_size=25`;

  const games = await axiosApi("games", url, false);
  res.status(200).json({ games });
};

const getSpecificGame = async (req: Request, res: Response) => {
  const id = req.params.id;
  if (!id) return res.sendStatus(400);

  const game = await axiosApi(`games/${id}`, undefined, false);
  const screenshots = await axiosApi(`games/${id}/screenshots`);
  res.status(200).json({ game, screenshots });
};

const getUserGames = async (req: IGetUserIdWithPage, res: Response) => {
  const userId = req.userId;
  let { page }: { page: string | number } = req.query;
  page = parseInt(page);
  const pageToSlice = page - 1;
  if (!userId) return res.sendStatus(401);
  const gameList = await UserGames.findAll({ where: { UserId: userId } });
  const slicedGameList = gameList.slice(pageToSlice * 25, page * 25);
  return res
    .status(200)
    .json({ count: gameList.length, results: slicedGameList });
};

const getUserWishes = async (req: IGetUserIdWithPage, res: Response) => {
  const userId = req.userId;
  let { page }: { page: string | number } = req.query;
  page = parseInt(page);
  const pageToSlice = page - 1;
  if (!userId) return res.sendStatus(401);
  const gameList = await UserWishes.findAll({ where: { UserId: userId } });
  const slicedGameList = gameList.slice(pageToSlice * 25, page * 25);
  return res
    .status(200)
    .json({ count: gameList.length, results: slicedGameList });
};

export {
  getAllGames,
  getGeneres,
  getPlafroms,
  getTags,
  getSearchedGames,
  getSpecificGame,
  getUserGames,
  getUserWishes,
};
