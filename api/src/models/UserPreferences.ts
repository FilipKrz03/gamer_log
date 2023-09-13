import { Json } from "sequelize/types/utils";
import sequelize from "../utils/database";
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface UserPreferencesModel
  extends Model<
    InferAttributes<UserPreferencesModel>,
    InferCreationAttributes<UserPreferencesModel>
  > {
  genres: string;
  platforms: string;
  tags: string;
  UserId: number;
}

const UserPreferences = sequelize.define<UserPreferencesModel>(
  "UserPreferences",
  {
    genres: { type: DataTypes.JSON },
    platforms: { type: DataTypes.JSON },
    tags: { type: DataTypes.JSON },
    UserId: { type: DataTypes.INTEGER },
  }
);

export default UserPreferences;
