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
    logging: console.log
  },
  test: {
    username: 'root',
    password: 'password',
    database: 'store',
    host: 'mysql',
    dialect: 'mysql',
    operatorsAliases: 0,
    seederStorage: 'sequelize',
    logging: console.log
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    seederStorage: 'sequelize',
    operatorsAliases: 0
  },
};
