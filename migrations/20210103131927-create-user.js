'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      middleName: Sequelize.STRING,
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      email: { // TODO добавить встроенную валидацию на email
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'BANNED'),
        defaultValue: 'INACTIVE'
      },
      activationToken: Sequelize.STRING,
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resetToken: Sequelize.STRING,
      authToken: { // TODO это не токен а просто хэш. Его обычно называют authKey
        allowNull: false,
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles',
          key: 'id' // TODO можно не указывать
        }
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      isCustomer: { // TODO зачем надо это поле если есть роли? создай роль Customer
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE, //TODO в таких полях очень важно указывать часовой пояс. Используй TIMESTAMP
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
    await queryInterface.dropTable('Users');
  }
};
