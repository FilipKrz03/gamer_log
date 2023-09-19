import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./utils/database";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";
import { errorHandler } from "./middleware/errors";

import gamesRouter from "./routes/gamesRoute";
import usersRouter from "./routes/usersRoute";

import User from "./models/User";
import UserGames from "./models/UserGames";
import UserWishes from "./models/UserWishes";
import UserPreferences from "./models/UserPreferences";

export const app = express();

app.use(credentials);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", gamesRouter);
app.use("/", usersRouter);

app.use(errorHandler);

User.hasMany(UserGames);
UserGames.hasMany(User);
User.hasMany(UserWishes);
UserWishes.hasMany(User);
User.hasOne(UserPreferences);
UserPreferences.hasOne(User);

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => {
  console.log("Server is working on port " + PORT);
});
