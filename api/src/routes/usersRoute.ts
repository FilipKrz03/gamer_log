import express from "express";
import {
  addGameToUsersGames,
  addGameToUsersWishes,
  checkIfGameIsOnTheList,
  removeGameFromUserGames,
  removeGameFromUserWishes,
  handleChangePassword,
  handleChangeUsername,
  addUserPreferences,
  getUserPreferences,
  editUserPreferences,
} from "../controllers/usersController";
import {
  handleNewUser,
  handleLogin,
  handleRefresh,
  handleLogout,
} from "../controllers/authController";
import verifyJwt from "../middleware/verifyJWT";

const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);
usersRouter.get("/refresh", handleRefresh);
usersRouter.get("/logout", handleLogout);
usersRouter.post("/newgame", verifyJwt, addGameToUsersGames);
usersRouter.post("/newwish", verifyJwt, addGameToUsersWishes);
usersRouter.post("/check", verifyJwt, checkIfGameIsOnTheList);
usersRouter.delete("/game", verifyJwt, removeGameFromUserGames);
usersRouter.delete("/wish", verifyJwt, removeGameFromUserWishes);
usersRouter.post("/changepwd", verifyJwt, handleChangePassword);
usersRouter.post("/changeusr", verifyJwt, handleChangeUsername);
usersRouter.post("/preferences", verifyJwt, addUserPreferences);
usersRouter.get("/preferences", verifyJwt, getUserPreferences);
usersRouter.post("/editpreferences", verifyJwt, editUserPreferences);

export default usersRouter;
