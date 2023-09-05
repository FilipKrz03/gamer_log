import express from "express";
import {
  handleLogin,
  handleNewUser,
  handleRefresh,
  addGameToUsersGames
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);
usersRouter.get("/refresh", handleRefresh);
usersRouter.post('/newgame', addGameToUsersGames);

export default usersRouter;
