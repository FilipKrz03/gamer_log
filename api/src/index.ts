require("dotenv").config();
import { Sequelize } from "sequelize";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./utils/database";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";

import gamesRouter from "./routes/gamesRoute";
import usersRouter from "./routes/usersRoute";

import User from "./models/User";
import UserGames from "./models/UserGames";
import UserWishes from "./models/UserWishes";
import UserPreferences from "./models/UserPreferences";

const app = express();

app.use(credentials);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", gamesRouter);
app.use("/", usersRouter);

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

app.listen(3500, () => {
  console.log("Server is working");
});
