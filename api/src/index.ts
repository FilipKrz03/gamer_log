require("dotenv").config();
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import gamesRouter from "./routes/gamesRoute";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/", gamesRouter);

app.listen(3500, () => {
  console.log("Server is working");
});
