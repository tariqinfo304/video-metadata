"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = __importDefault(require("../config/db"));
class Video extends sequelize_1.Model {
    id;
    title;
    description;
    duration;
    genre;
    tags;
}
Video.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    genre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    tags: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: db_1.default, // Pass the sequelize instance
    tableName: 'videos', // Table name
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
});
exports.default = Video;
