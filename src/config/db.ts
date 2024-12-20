import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('video_metadata', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export default sequelize;
