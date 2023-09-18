import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "gamer_log",
  "root",
  process.env.DATABASE_SECRET,
  {
    host: "localhost",
    dialect: "mysql",
    logging:false , 
  }
);

export default sequelize;
