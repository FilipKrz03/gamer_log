import express, { Request, Response } from "express";
import axiosApi from "../utils/axios";

const getAllGames = async (req: Request, res: Response) => {
  await axiosApi("games", res);
};

const getGeneres = async (req: Request, res: Response) => {
  await axiosApi("genres", res);
};

export { getAllGames, getGeneres };
