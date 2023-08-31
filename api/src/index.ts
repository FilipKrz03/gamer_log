require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const User = require("./models/User");

import gamesRouter from "./routes/gamesRoute";
import usersRouter from "./routes/usersRoute";
import sequelize from "./utils/database";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.json());

app.use("/", gamesRouter);
app.use("/", usersRouter);

sequelize
  .sync({ force: true })
  .then((result) => {})
  .catch((err) => {
    console.log(err);
  });

app.listen(3500, () => {
  console.log("Server is working");
});
