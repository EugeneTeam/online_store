'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
        {name: 'admin'},
        {name: 'customer'},
        {name: 'manager'},
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', {name: [
        'admin', 'customer', 'manager',
      ]}, {});
  }
};
