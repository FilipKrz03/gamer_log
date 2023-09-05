import sequelize from "../utils/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  INTEGER,
} from "sequelize";

interface UserGameModel
  extends Model<
    InferAttributes<UserGameModel>,
    InferCreationAttributes<UserGameModel>
  > {
  gameId: number;
  UserId:number,
}

const UserGames = sequelize.define<UserGameModel>("UserGames", {
  gameId: {
    type: DataTypes.INTEGER,
  },
  UserId:INTEGER
 
});

export default UserGames;
