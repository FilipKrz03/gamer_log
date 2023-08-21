require("dotenv").config();
import express from "express";

import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3500, () => {
  console.log("Server is working");
});
