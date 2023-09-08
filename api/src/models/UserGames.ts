import sequelize from "../utils/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  INTEGER,
  STRING,
  DOUBLE,
  BOOLEAN,
} from "sequelize";

interface UserGameModel
  extends Model<
    InferAttributes<UserGameModel>,
    InferCreationAttributes<UserGameModel>
  > {
  gameId: number;
  title: string;
  image: string;
  hasPc: boolean;
  hasXbox: boolean;
  hasPlayStation: boolean;
  genre: string;
  rating: number;
  UserId: number;
}

const UserGames = sequelize.define<UserGameModel>("UserGames", {
  gameId: {
    type: DataTypes.INTEGER,
  },
  title: STRING,
  image: STRING,
  hasPc: BOOLEAN,
  hasXbox: BOOLEAN,
  hasPlayStation: BOOLEAN,
  genre: STRING,
  rating: DOUBLE,
  UserId: INTEGER,
});

export default UserGames;
