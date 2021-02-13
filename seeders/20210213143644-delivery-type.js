'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('DeliveryTypes', [
        {
            status: 'ACTIVE',
            name: 'К отделению новой почты',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            status: 'INACTIVE',
            name: 'Доставка курьером',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('DeliveryTypes', {}, {});
  }
};
