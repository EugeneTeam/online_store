require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: 'password',
    database: 'store',
    host: 'mysql',
    dialect: 'mysql',
    operatorsAliases: 0,
    seederStorage: 'sequelize',
    logging: true
  },
  test: {
    username: 'root',
    password: null,
    database: 'arena',
    host: '127.0.0.1',
    dialect: 'mysql',
    operatorsAliases: 0,
    seederStorage: 'sequelize',
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    operatorsAliases: 0,
    logging: false,
  },
};
