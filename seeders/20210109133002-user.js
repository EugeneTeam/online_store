'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [{
        firstName: 'Admin',
        lastName: 'Admin',
        phone: '0123456789',
        email: 'some@email.com',
        roleId: 'admin',
        status: 'INACTIVE',
        passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD_FOR_ADMIN),
        authToken: await models.User.generateAuthToken(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {roleId: 'admin' }, {});
  }
};
