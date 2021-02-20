'use strict';
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
        {name: 'Processors', createdAt: new Date(), updatedAt: new Date()},
        {name: 'Video cards', createdAt: new Date(), updatedAt: new Date()},
        {name: 'SSD Disk', createdAt: new Date(), updatedAt: new Date()},
        {name: 'HDD Disk', createdAt: new Date(), updatedAt: new Date()},
        {name: 'RAM memory', createdAt: new Date(), updatedAt: new Date()}
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', {}, {});
  }
};
