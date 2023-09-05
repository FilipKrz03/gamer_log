import express from "express";
import {
  handleLogin,
  handleNewUser,
  handleRefresh,
  addGameToUsersGames,
  addGameToUsersWishes,
} from "../controllers/usersController";
import verifyJwt from "../middleware/verifyJWT";

const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);
usersRouter.get("/refresh", handleRefresh);
usersRouter.post("/newgame", verifyJwt, addGameToUsersGames);
usersRouter.post("/newwish", verifyJwt, addGameToUsersWishes);

export default usersRouter;
