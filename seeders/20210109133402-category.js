'use strict';
require('dotenv').config();
const models = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
        {name: 'Processors', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Video cards', createdAt: new Date(), updatedAt: new Date()}
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {}, {});
  }
};
