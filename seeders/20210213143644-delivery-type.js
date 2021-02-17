'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DeliveryTypes', [
        {
            name: 'К отделению новой почты',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Доставка курьером',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeliveryTypes', {}, {});
  }
};
