'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Discounts', [
        {
            type: 'PERCENT',
            discount: 10,
            expiredAt: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
        },
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Discounts', {}, {});
  }
};
