'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Discounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('PERCENT', 'SUM')
      },
      discount: {        //TODO переименуй в amount, это больше подходит по смыслу
        allowNull: false,
        type: Sequelize.FLOAT
      },
      expiredAt: {
        allowNull: false,
        type: Sequelize.DATE, //TODO тоже нужен часовой пояс
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Discounts');
  }
};
