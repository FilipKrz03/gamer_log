import express from "express";
import { getAllGames, getGeneres } from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/games", getAllGames);
gamesRouter.get("/genres", getGeneres);

export default gamesRouter;
