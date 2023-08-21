require("dotenv").config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "gamer_log",
  "root",
  process.env.DATABASE_SECRET,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
