import express from "express";
import {
  handleLogin,
  handleNewUser,
  handleRefresh,
} from "../controllers/usersController";

const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);
usersRouter.get("/refresh", handleRefresh);

export default usersRouter;
