import express from "express";
import { fetchAllGames } from "../controllers/gamesController";

const gamesRouter = express.Router();

gamesRouter.get("/", fetchAllGames);

export default gamesRouter;
