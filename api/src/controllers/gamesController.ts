import { Request, Response } from "express";
import axiosApi from "../utils/axios";
import { Genre } from "../../../types";

const getAllGames = async (req: Request, res: Response) => {
  try {
    const games = await axiosApi("games");
    res.status(200).json({ games });
  } catch (err) {
    res.sendStatus(401);
  }
};

const getGeneres = async (req: Request, res: Response) => {
  try {
    const genres: Awaited<Genre[]> = await axiosApi("genres");
    let genresArray: Genre[] = [];
    genres.map((genre) => {
      const genreIitem = {
        id: genre.id,
        name: genre.name,
      };
      genresArray.push(genreIitem);
    });
    res.status(200).json({ genres: genresArray });
  } catch (err) {
    res.sendStatus(401);
  }
};

const getPlafroms = async (req: Request, res: Response) => {
  try {
    const plafroms: Awaited<Genre[]> = await axiosApi("platforms");
    let plafromsArray: Genre[] = [];
    plafroms.map((genre) => {
      const genreIitem = {
        id: genre.id,
        name: genre.name,
      };
      plafromsArray.push(genreIitem);
      plafromsArray = plafromsArray.slice(0, 15);
    });
    res.status(200).json({ plafroms: plafromsArray });
  } catch (err) {
    res.sendStatus(401);
  }
};

const getSearchedGames = async (req: Request, res: Response) => {
  const { search, genres, platforms, page } = req.query;
  const url = `${search ? "&search=" + search : ""}${
    genres ? "&genres=" + genres : ""
  }${platforms ? "&platforms=" + platforms : ""}&page=${page}&page_size=25`;
  console.log('games'+url);
  try {
    const games = await axiosApi("games", url, false);
    res.status(200).json({ games });
  } catch (err) {
    res.sendStatus(401);
  }
};

export { getAllGames, getGeneres, getPlafroms, getSearchedGames };
