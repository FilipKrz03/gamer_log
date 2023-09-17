import express from "express";
import {
  getAllGames,
  getGeneres,
  getPlafroms,
  getSearchedGames,
  getSpecificGame,
  getTags,
  getUserGames,
  getUserWishes,
} from "../controllers/gamesController";
import verifyJwt from "../middleware/verifyJWT";
import { IRouter } from "express";

interface IRouterUserId extends IRouter {
  userId?: number;
}

const gamesRouter: IRouterUserId = express.Router();

gamesRouter.get("/", getAllGames);
gamesRouter.get("/search/:id", getSpecificGame);
gamesRouter.get("/search", getSearchedGames);
gamesRouter.get("/genres", getGeneres);
gamesRouter.get("/platforms", getPlafroms);
gamesRouter.get("/tags", getTags);
gamesRouter.get("/mygames", verifyJwt, getUserGames);
gamesRouter.get("/mywishes", verifyJwt, getUserWishes);

export default gamesRouter;
