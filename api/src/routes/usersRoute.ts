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
import { catchAsyncErrors } from "../middleware/errors";

const usersRouter = express.Router();

usersRouter.post("/register", catchAsyncErrors(handleNewUser));
usersRouter.post("/login", catchAsyncErrors(handleLogin));
usersRouter.get("/refresh", catchAsyncErrors(handleRefresh));
usersRouter.get("/logout", catchAsyncErrors(handleLogout));
usersRouter.post("/newgame", verifyJwt, catchAsyncErrors(handleLogout));
usersRouter.post("/newwish", verifyJwt, catchAsyncErrors(addGameToUsersWishes));
usersRouter.post("/check", verifyJwt, catchAsyncErrors(checkIfGameIsOnTheList));
usersRouter.delete(
  "/game",
  verifyJwt,
  catchAsyncErrors(removeGameFromUserGames)
);
usersRouter.delete(
  "/wish",
  verifyJwt,
  catchAsyncErrors(removeGameFromUserWishes)
);
usersRouter.post(
  "/changepwd",
  verifyJwt,
  catchAsyncErrors(handleChangePassword)
);
usersRouter.post(
  "/changeusr",
  verifyJwt,
  catchAsyncErrors(handleChangeUsername)
);
usersRouter.post(
  "/preferences",
  verifyJwt,
  catchAsyncErrors(addUserPreferences)
);
usersRouter.get(
  "/preferences",
  verifyJwt,
  catchAsyncErrors(getUserPreferences)
);
usersRouter.post(
  "/editpreferences",
  verifyJwt,
  catchAsyncErrors(editUserPreferences)
);

export default usersRouter;
