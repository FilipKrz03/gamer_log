import express from "express";
import {
  getAllGames,
  getGeneres,
  getPlafroms,
  getSearchedGames,
  getSpecificGame
} from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/search/:id" , getSpecificGame)
gamesRouter.get("/search", getSearchedGames);
gamesRouter.get("/genres", getGeneres);
gamesRouter.get("/platforms", getPlafroms);

export default gamesRouter;
