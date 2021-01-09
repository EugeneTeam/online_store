'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('RolePermissions', [
        { roleId: 'admin', permissionId: 'product create' },
        { roleId: 'admin', permissionId: 'product update' },
        { roleId: 'admin', permissionId: 'product delete' },
        { roleId: 'admin', permissionId: 'product show' },
        ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('RolePermissions', {roleId: 'admin'}, {});
  }
};
