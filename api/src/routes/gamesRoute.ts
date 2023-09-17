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
import { catchAsyncErrors } from "../middleware/errors";
import { IRouter } from "express";

interface IRouterUserId extends IRouter {
  userId?: number;
}

const gamesRouter: IRouterUserId = express.Router();

gamesRouter.get("/", catchAsyncErrors(getAllGames));
gamesRouter.get("/search/:id", catchAsyncErrors(getSpecificGame));
gamesRouter.get("/search", catchAsyncErrors(getSearchedGames));
gamesRouter.get("/genres", catchAsyncErrors(getGeneres));
gamesRouter.get("/platforms", catchAsyncErrors(getPlafroms));
gamesRouter.get("/tags", catchAsyncErrors(getTags));
gamesRouter.get("/mygames", verifyJwt, catchAsyncErrors(getUserGames));
gamesRouter.get("/mywishes", verifyJwt, catchAsyncErrors(getUserWishes));

export default gamesRouter;
