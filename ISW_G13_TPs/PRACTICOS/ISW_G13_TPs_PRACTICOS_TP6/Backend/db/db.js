// db/db.js
import Sequelize from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isTestEnvironment = process.env.NODE_ENV === 'test';
let sequelize;

if (isTestEnvironment) {
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
} else {
  sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, 'database.db')
  });
}

export default sequelize;