import express from "express";
import {
  handleLogin,
  handleNewUser,
  handleRefresh,
  addGameToUsersGames,
  addGameToUsersWishes,
  checkIfGameIsOnTheList,
  removeGameFromUserGames,
  removeGameFromUserWishes,
  handleLogout,
  handleChangePassword,
  handleChangeUsername,
  addUserPreferences,
  getUserPreferences,
  editUserPreferences,
} from "../controllers/usersController";
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
usersRouter.get('/preferences' , verifyJwt , getUserPreferences);
usersRouter.post('/editpreferences' , verifyJwt , editUserPreferences)

export default usersRouter;
