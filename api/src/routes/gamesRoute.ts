import express from "express";
import {
  getAllGames,
  getGeneres,
  getPlafroms,
} from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/games", getAllGames);
gamesRouter.get("/genres", getGeneres);
gamesRouter.get("/platforms", getPlafroms);

export default gamesRouter;
