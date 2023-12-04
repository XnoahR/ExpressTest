import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      email: true,
      validate: {
        isEmail: true,
      },
      set(value){
        this.setDataValue("email", value.toLowerCase()); 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      min: 6,
      max: 20,
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      min: 4,
      max: 30,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "user"
  }
);

sequelize.sync();

export default User;