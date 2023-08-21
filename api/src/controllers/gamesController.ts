import express, { Request, Response } from "express";
import { apiGamesAxios } from "../utils/axios";

const fetchAllGames = async (req: Request, res: Response) => {
  try {
    const games = await apiGamesAxios.get("");
    res.status(200).json(games.data.results);
  } catch (err) {
    res.status(401);
  }
};

export {fetchAllGames}