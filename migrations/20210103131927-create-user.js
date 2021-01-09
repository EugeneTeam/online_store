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
        validate: {
          isAlpha: true
        }
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isAlpha: true
        }
      },
      phone: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          is: /^[0-9]{10,12}$/g
        },
        unique: true
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          isEmail: true
        },
        unique: true
      },
      status: {
        allowNull: false,
        type: Sequelize.ENUM('ACTIVE', 'INACTIVE', 'BANNED'),
        defaultValue: 'INACTIVE'
      },
      passwordHash: {
        allowNull: false,
        type: Sequelize.STRING
      },
      resetToken: Sequelize.STRING,
      authToken: {
        allowNull: false,
        type: Sequelize.STRING
      },
      roleId: {
        allowNull: false,
        type: Sequelize.STRING,
        references: {
          model: 'Roles',
          key: 'nameId'
        }
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
    await queryInterface.dropTable('Users');
  }
};
