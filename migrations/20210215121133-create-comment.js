'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      productId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Products'
        },
        onDelete: 'CASCADE'
      },
      limitations: Sequelize.STRING,//TODO disadvantages
      dignity: Sequelize.STRING, //TODO advantages
      text: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      rating: Sequelize.FLOAT,
      parentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Comments'
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
      }//TODO добавь статус комментария дя модерации: новый, подтвержденный, забаненный
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Comments');
  }
};
