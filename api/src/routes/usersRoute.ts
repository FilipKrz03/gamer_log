import express from "express";
import { handleNewUser } from "../controllers/usersController";
const usersRouter = express.Router();

usersRouter.post("/register", handleNewUser);

export default usersRouter