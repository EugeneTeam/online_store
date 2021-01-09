'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
        {nameId: 'admin'},
        {nameId: 'customer'},
        {nameId: 'manager'},
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', {nameId: [
        'admin', 'customer', 'manager',
      ]}, {});
  }
};
