'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FeatureProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
      characteristicId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Characteristics'
        },
        onDelete: 'CASCADE'
      },
      valueId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Values'
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('FeatureProducts');
  }
};
