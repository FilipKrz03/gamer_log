import express from "express";
import {
  handleLogin,
  handleNewUser,
  handleRefresh,
  addGameToUsersGames,
  addGameToUsersWishes,
  checkIfGameIsOnTheList,
  removeGameFromUserGames,
  removeGameFromUserWishes
} from "../controllers/usersController";
import verifyJwt from "../middleware/verifyJWT";

const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);
usersRouter.get("/refresh", handleRefresh);
usersRouter.post("/newgame", verifyJwt, addGameToUsersGames);
usersRouter.post("/newwish", verifyJwt, addGameToUsersWishes);
usersRouter.post("/check", verifyJwt, checkIfGameIsOnTheList);
usersRouter.delete('/game' , verifyJwt , removeGameFromUserGames);
usersRouter.delete('/wish' , verifyJwt , removeGameFromUserWishes)

export default usersRouter;
