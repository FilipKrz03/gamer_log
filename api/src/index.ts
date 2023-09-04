require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./utils/database";
import corsOptions from "./config/corsOptions";
import credentials from "./middleware/credentials";

import gamesRouter from "./routes/gamesRoute";
import usersRouter from "./routes/usersRoute";

const User = require("./models/User");

const app = express();

app.use(credentials);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());

app.use("/", gamesRouter);
app.use("/", usersRouter);

sequelize
  .sync()
  .then((result) => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(3500, () => {
  console.log("Server is working");
});
