'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('OrderOrderParts', {
      orderId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'Orders'
        },
        onDelete: 'CASCADE'
      },
      orderPartId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'OrderParts'
        },
        onDelete: 'CASCADE'
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('OrderOrderParts');
  }
};
