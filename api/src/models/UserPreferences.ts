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
  id: CreationOptional<number>;
  genres: number[];
  platforms: number[];
  tags: number[];
  UserId: number;
}

const UserPreferences = sequelize.define<UserPreferencesModel>(
  "UserPreferences",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    genres: DataTypes.ARRAY(DataTypes.NUMBER),
    platforms: DataTypes.ARRAY(DataTypes.NUMBER),
    tags: DataTypes.ARRAY(DataTypes.NUMBER),
    UserId: DataTypes.INTEGER,
  }
);

export default UserPreferences;
