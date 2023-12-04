import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

const post = sequelize.define(
    "post",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        upload_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },  
        status: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        id_animal: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        },
        {
            tableName: "post",
            timestamps: false,
            
        }
);