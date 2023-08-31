import express from "express";
import { handleLogin, handleNewUser } from "../controllers/usersController";
const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);
usersRouter.post("/login", handleLogin);

export default usersRouter;
