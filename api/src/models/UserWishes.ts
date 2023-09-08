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

interface UserWishModel
  extends Model<
    InferAttributes<UserWishModel>,
    InferCreationAttributes<UserWishModel>
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

const UserWishes = sequelize.define<UserWishModel>("UserWishes", {
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

export default UserWishes;
