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
    const genres: Promise<Genre[]> = await axiosApi("genres");
    let genresArray: Genre[] = [];
    (await genres).map((genre) => {
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

export { getAllGames, getGeneres };
