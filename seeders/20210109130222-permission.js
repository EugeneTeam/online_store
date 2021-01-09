'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
        {nameId: 'product create'},
        {nameId: 'product update'},
        {nameId: 'product delete'},
        {nameId: 'product show'},
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', {nameId: [
        'product create', 'product update',  'product delete', 'product show'
      ]}, {});
  }
};
