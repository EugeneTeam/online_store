'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permissions', [
        {name: 'product create'},
        {name: 'product update'},
        {name: 'product delete'},
        {name: 'product show'},
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permissions', {name: [
        'product create', 'product update',  'product delete', 'product show'
      ]}, {});
  }
};
