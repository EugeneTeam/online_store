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
            address: 'some street 25',
            status: 'ACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD),
            authToken: await models.User.generateAuthToken(),
            isCustomer: false,
        },
        // product manager
        {
            firstName: 'product',
            lastName: 'manager',
            phone: '1123456789',
            email: 'productmanager@email.com',
            roleId: 3,
            address: 'some street 25',
            status: 'ACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD),
            authToken: await models.User.generateAuthToken(),
            isCustomer: false,
        },
        // media manager
        {
            firstName: 'media',
            lastName: 'manager',
            phone: '2123456789',
            email: 'mediamanager@email.com',
            roleId: 4,
            address: 'some street 25',
            status: 'ACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD),
            authToken: await models.User.generateAuthToken(),
            isCustomer: false,
        },
        // feature product manager
        {
            firstName: 'feature-product',
            lastName: 'manager',
            phone: '3123456789',
            email: 'featureproductmanager@email.com',
            roleId: 5,
            address: 'some street 25',
            status: 'ACTIVE',
            passwordHash: await models.User.encryptPassword(process.env.DEFAULT_PASSWORD),
            authToken: await models.User.generateAuthToken(),
            isCustomer: false,
        }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {roleId: 'admin' }, {});
  }
};
