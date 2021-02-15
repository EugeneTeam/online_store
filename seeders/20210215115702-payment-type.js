'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('PaymentTypes', [
        {
            name: 'Оплата при получение',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: 'Оплата картой Visa/MasterCard (LiqPay)',
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('PaymentTypes', {}, {});
  }
};
