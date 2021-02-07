'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
        {
            firstName: 'Admin',
            lastName: 'Admin',
            phone: '0123456789',
            email: 'some@email.com',
            roleId: 1,
            status: 'INACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD_FOR_ADMIN),
            authToken: await models.User.generateAuthToken(),
        },
        // product manager
        {
            firstName: 'product',
            lastName: 'manager',
            phone: '1123456789',
            email: 'productmanager@email.com',
            roleId: 3,
            status: 'INACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD_FOR_ADMIN),
            authToken: await models.User.generateAuthToken(),
        },
        // media manager
        {
            firstName: 'media',
            lastName: 'manager',
            phone: '2123456789',
            email: 'mediamanager@email.com',
            roleId: 4,
            status: 'INACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD_FOR_ADMIN),
            authToken: await models.User.generateAuthToken(),
        },
        // feature product manager
        {
            firstName: 'feature-product',
            lastName: 'manager',
            phone: '3123456789',
            email: 'featureproductmanager@email.com',
            roleId: 5,
            status: 'INACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD_FOR_ADMIN),
            authToken: await models.User.generateAuthToken(),
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {roleId: 'admin' }, {});
  }
};
