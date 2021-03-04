'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('NEW', 'BEING_FORMED', 'SENT', 'CANCELED'),//TODO BEING_FORMED -> pending(принят в обработку) + добавь done(выполнен) + raw(еще не оформлена корзина)
        defaultValue: 'NEW'
      },
      userId: {
        allowNull: false,//TODO нужно чтобы юзер мог купить что-то не регистрируясь
        type: Sequelize.INTEGER,
        references: {
          model: 'Users'
        },
        onDelete: 'CASCADE'
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      middleName: Sequelize.STRING,
      phone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deliveryTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'DeliveryTypes'
        },
        onDelete: 'CASCADE'
      },
      paymentTypeId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'PaymentTypes'
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
    await queryInterface.dropTable('Orders');
  }
};
