import sequelize from "../utils/database";
import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  INTEGER,
} from "sequelize";

interface UserWishModel
  extends Model<
    InferAttributes<UserWishModel>,
    InferCreationAttributes<UserWishModel>
  > {
  gameId: number;
  UserId: number;
}

const UserWishes = sequelize.define<UserWishModel>("UserWishes", {
  gameId: {
    type: DataTypes.INTEGER,
  },
  UserId: INTEGER,
});

export default UserWishes;
