import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';

class Video extends Model {
  public id!: number;
  public title!: string;
  public description!: string;
  public duration!: number;
  public genre!: string;
  public tags!: string;
}

Video.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,  // Pass the sequelize instance
    tableName: 'videos', // Table name
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

export default Video;
