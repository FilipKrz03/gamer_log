import sequelize from "../utils/database";
import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id: CreationOptional<number>;
  email: string;
  password: string;
}

const User = sequelize.define<UserModel>("User", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

export default User;
