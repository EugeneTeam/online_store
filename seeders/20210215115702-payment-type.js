'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PaymentTypes', [
        {
            name: 'Оплата при получение',
            status: 'ACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Оплата картой Visa/MasterCard (LiqPay)',
            status: 'INACTIVE',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PaymentTypes', {}, {});
  }
};
