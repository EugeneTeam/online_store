'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('RolePermissions', {
      permissionId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Permissions'
        },
        onDelete: 'CASCADE'
      },
      roleId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Roles'
        },
        onDelete: 'CASCADE'
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('RolePermissions');
  }
};
